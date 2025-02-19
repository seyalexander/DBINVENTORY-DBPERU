import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagramaCircularDashboardComponent } from './diagrama-circular-dashboard.component';

describe('DiagramaCircularDashboardComponent', () => {
  let component: DiagramaCircularDashboardComponent;
  let fixture: ComponentFixture<DiagramaCircularDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiagramaCircularDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiagramaCircularDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
