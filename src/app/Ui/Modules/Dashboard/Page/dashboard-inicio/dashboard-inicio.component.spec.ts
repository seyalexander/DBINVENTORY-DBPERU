import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardInicioComponent } from './dashboard-inicio.component';

describe('DashboardInicioComponent', () => {
  let component: DashboardInicioComponent;
  let fixture: ComponentFixture<DashboardInicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardInicioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
