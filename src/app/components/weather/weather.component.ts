import { OwlOptions } from './../../../../node_modules/ngx-owl-carousel-o/lib/models/owl-options.model.d';
import { Component, inject, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { IWeather, Forecast } from '../../core/interfaces/IWeather';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe, SearchPipe, RouterLink, CarouselModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss'
})
export class WeatherComponent implements OnInit {
  private readonly _weatherService = inject(WeatherService);

  weatherList: IWeather[] = [];
  searchTerm = '';
  unit: 'C' | 'F' = 'C';
  selectedDate: string | null = null;

  customOptionsWeather = {
    loop: true,
    mouseDrag: false,
    autoplay: true,
    autoplayTimeout: 2000,
    navText: [
      '<span class="text-primary"><i class="fas fa-chevron-left"></i></span>',
      '<span class="text-primary"><i class="fas fa-chevron-right"></i></span>'
    ],
    autoplayHoverPause: true,
    margin: 16,
    dots: false,
    responsive: {
      0: { items: 1 },
      576: { items: 2 },
      768: { items: 3 },
      992: { items: 4 }
    },
    nav: true,
  };




  ngOnInit(): void {
    this._weatherService.getForecast().subscribe({
      next: (res) => {
        this.weatherList = res.map((city: IWeather) => ({
          ...city,
          forecast: city.forecast.map((f: Forecast) => ({
            ...f,
            date: new Date(f.date)
          }))
        }));
      },
      error: (err) => {
        console.error('Failed to load forecasts', err);
      }
    });
  }

  getForecastForSelectedDate(city: IWeather): Forecast | null {
    if (!this.selectedDate) {
      return city.forecast[city.forecast.length - 1] || null;
    }

    const filterDate = new Date(this.selectedDate);
    return city.forecast.find(f =>
      new Date(f.date).toDateString() === filterDate.toDateString()
    ) || null;
  }


  hasForecastForSelectedDate(city: IWeather): boolean {
    if (!this.selectedDate) return true;

    const filterDate = new Date(this.selectedDate);
    return city.forecast.some(f =>
      new Date(f.date).toDateString() === filterDate.toDateString()
    );
  }

  hasDisplayableCities(): boolean {
    const filteredBySearch = this.weatherList.filter(city =>
      !this.searchTerm || city.city.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    return filteredBySearch.some(city => this.hasForecastForSelectedDate(city));
  }

  clearDateFilter(): void {
    this.selectedDate = '';
  }

  clearSearchFilter(): void {
    this.searchTerm = '';
  }
  clearAllFilters(): void {
    this.searchTerm = '';
    this.selectedDate = '';
  }

}