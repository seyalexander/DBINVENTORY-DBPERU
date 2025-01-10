import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TdEstado2Component } from './td-estado-2.component';

describe('TdEstado2Component', () => {
  let component: TdEstado2Component;
  let fixture: ComponentFixture<TdEstado2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TdEstado2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TdEstado2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
