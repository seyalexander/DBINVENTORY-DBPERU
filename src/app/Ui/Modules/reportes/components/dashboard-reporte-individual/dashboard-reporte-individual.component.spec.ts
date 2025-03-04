import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardReporteIndividualComponent } from './dashboard-reporte-individual.component';

describe('DashboardReporteIndividualComponent', () => {
  let component: DashboardReporteIndividualComponent;
  let fixture: ComponentFixture<DashboardReporteIndividualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardReporteIndividualComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardReporteIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
