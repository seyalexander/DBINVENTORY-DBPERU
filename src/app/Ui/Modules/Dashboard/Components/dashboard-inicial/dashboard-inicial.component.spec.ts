import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardInicialComponent } from './dashboard-inicial.component';

describe('DashboardInicialComponent', () => {
  let component: DashboardInicialComponent;
  let fixture: ComponentFixture<DashboardInicialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardInicialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardInicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
