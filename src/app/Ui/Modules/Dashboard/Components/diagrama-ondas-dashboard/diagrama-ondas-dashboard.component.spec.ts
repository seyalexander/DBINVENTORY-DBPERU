import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagramaOndasDashboardComponent } from './diagrama-ondas-dashboard.component';

describe('DiagramaOndasDashboardComponent', () => {
  let component: DiagramaOndasDashboardComponent;
  let fixture: ComponentFixture<DiagramaOndasDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiagramaOndasDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiagramaOndasDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
