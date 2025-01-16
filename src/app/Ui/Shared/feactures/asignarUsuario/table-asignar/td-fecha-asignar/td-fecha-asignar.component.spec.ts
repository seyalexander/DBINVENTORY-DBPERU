import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TdFechaAsignarComponent } from './td-fecha-asignar.component';

describe('TdFechaAsignarComponent', () => {
  let component: TdFechaAsignarComponent;
  let fixture: ComponentFixture<TdFechaAsignarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TdFechaAsignarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TdFechaAsignarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
