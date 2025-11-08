import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificWeatherComponent } from './specific-weather.component';

describe('SpecificWeatherComponent', () => {
  let component: SpecificWeatherComponent;
  let fixture: ComponentFixture<SpecificWeatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecificWeatherComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpecificWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
