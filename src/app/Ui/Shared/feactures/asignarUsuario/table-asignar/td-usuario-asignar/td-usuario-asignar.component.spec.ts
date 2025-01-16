import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TdUsuarioAsignarComponent } from './td-usuario-asignar.component';

describe('TdUsuarioAsignarComponent', () => {
  let component: TdUsuarioAsignarComponent;
  let fixture: ComponentFixture<TdUsuarioAsignarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TdUsuarioAsignarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TdUsuarioAsignarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
