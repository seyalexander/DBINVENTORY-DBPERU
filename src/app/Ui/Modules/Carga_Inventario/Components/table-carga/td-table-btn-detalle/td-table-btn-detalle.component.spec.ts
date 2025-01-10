import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TdTableBtnDetalleComponent } from './td-table-btn-detalle.component';

describe('TdTableBtnDetalleComponent', () => {
  let component: TdTableBtnDetalleComponent;
  let fixture: ComponentFixture<TdTableBtnDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TdTableBtnDetalleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TdTableBtnDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
