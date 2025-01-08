import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsCargaDatosComponent } from './stats-carga-datos.component';

describe('StatsCargaDatosComponent', () => {
  let component: StatsCargaDatosComponent;
  let fixture: ComponentFixture<StatsCargaDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatsCargaDatosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatsCargaDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
