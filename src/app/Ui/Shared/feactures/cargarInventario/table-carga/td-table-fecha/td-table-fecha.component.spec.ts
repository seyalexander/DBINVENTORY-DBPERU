import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TdTableFechaComponent } from './td-table-fecha.component';

describe('TdTableFechaComponent', () => {
  let component: TdTableFechaComponent;
  let fixture: ComponentFixture<TdTableFechaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TdTableFechaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TdTableFechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
