import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderResponsiveComponent } from './header-responsive.component';

describe('HeaderResponsiveComponent', () => {
  let component: HeaderResponsiveComponent;
  let fixture: ComponentFixture<HeaderResponsiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderResponsiveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderResponsiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
