import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselImgComponent } from './carousel-img.component';

describe('CarouselImgComponent', () => {
  let component: CarouselImgComponent;
  let fixture: ComponentFixture<CarouselImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselImgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarouselImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
