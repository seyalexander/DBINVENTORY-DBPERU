import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroAsignarPageComponent } from './registro-asignar-page.component';

describe('RegistroAsignarPageComponent', () => {
  let component: RegistroAsignarPageComponent;
  let fixture: ComponentFixture<RegistroAsignarPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroAsignarPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistroAsignarPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
