import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThTableAsignarComponent } from './th-table-asignar.component';

describe('ThTableAsignarComponent', () => {
  let component: ThTableAsignarComponent;
  let fixture: ComponentFixture<ThTableAsignarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThTableAsignarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThTableAsignarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
