export interface IWeather {
  id:       number;
  city:     string;
  forecast: Forecast[];
}

export interface Forecast {
  date:                  Date;
  temperatureCelsius:    number;
  temperatureFahrenheit: number;
  humidity:              number;
}
