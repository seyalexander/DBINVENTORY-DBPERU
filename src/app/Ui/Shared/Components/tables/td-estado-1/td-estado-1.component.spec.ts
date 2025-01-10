import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TdEstado1Component } from './td-estado-1.component';

describe('TdEstado1Component', () => {
  let component: TdEstado1Component;
  let fixture: ComponentFixture<TdEstado1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TdEstado1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TdEstado1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
