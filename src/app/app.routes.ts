import { NotFoundComponent } from './components/not-found/not-found.component';
import { Routes } from '@angular/router';
import { WeatherComponent } from './components/weather/weather.component';
import { SpecificWeatherComponent } from './components/specific-weather/specific-weather.component';

export const routes: Routes = [
    {path:'',component:WeatherComponent},
    {path:'weather',component:WeatherComponent},
    
    {path:'weather/:id',component:SpecificWeatherComponent},
    
    { path: '**', component: NotFoundComponent }  
];
