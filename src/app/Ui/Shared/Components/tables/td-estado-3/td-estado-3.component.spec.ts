import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TdEstado3Component } from './td-estado-3.component';

describe('TdEstado3Component', () => {
  let component: TdEstado3Component;
  let fixture: ComponentFixture<TdEstado3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TdEstado3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TdEstado3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
