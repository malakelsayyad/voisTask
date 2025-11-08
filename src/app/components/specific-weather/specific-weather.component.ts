import { IWeather } from './../../core/interfaces/IWeather';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-specific-weather',
  standalone: true,
  imports: [DatePipe,RouterLink],
  templateUrl: './specific-weather.component.html',
  styleUrl: './specific-weather.component.scss'
})
export class SpecificWeatherComponent implements OnInit, OnDestroy {
  private readonly _weatherService = inject(WeatherService);
  private readonly _activatedRoute = inject(ActivatedRoute);

  weatherDetails?: IWeather; 
  private routeSub?: Subscription;

  ngOnInit(): void {
    this.routeSub = this._activatedRoute.paramMap.subscribe({
      next: (params) => {
        const cityIdStr = params.get('id');
        if (!cityIdStr) {
          console.error('No ID in route');
          return;
        }

        const cityId = Number(cityIdStr);
        if (isNaN(cityId)) {
          console.error('Invalid ID:', cityIdStr);
          return;
        }

        this._weatherService.getCityForecast(cityId).subscribe({
          next: (forecast) => {
            this.weatherDetails = forecast;
            console.log('Forecast loaded:', forecast);
          },
          error: (err) => {
            console.error('Failed to load forecast:', err);
            this.weatherDetails = undefined;
          }
        });
      },
      error: (err) => {
        console.error('Route error:', err);
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }
}