import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagramaMapaComponent } from './diagrama-mapa.component';

describe('DiagramaMapaComponent', () => {
  let component: DiagramaMapaComponent;
  let fixture: ComponentFixture<DiagramaMapaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiagramaMapaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiagramaMapaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
