import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosCheckboxTablaComponent } from './filtros-checkbox-tabla.component';

describe('FiltrosCheckboxTablaComponent', () => {
  let component: FiltrosCheckboxTablaComponent;
  let fixture: ComponentFixture<FiltrosCheckboxTablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltrosCheckboxTablaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FiltrosCheckboxTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
