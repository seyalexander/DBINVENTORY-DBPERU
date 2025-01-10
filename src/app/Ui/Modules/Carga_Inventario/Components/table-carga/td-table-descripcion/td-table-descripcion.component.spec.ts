import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TdTableDescripcionComponent } from './td-table-descripcion.component';

describe('TdTableDescripcionComponent', () => {
  let component: TdTableDescripcionComponent;
  let fixture: ComponentFixture<TdTableDescripcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TdTableDescripcionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TdTableDescripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
