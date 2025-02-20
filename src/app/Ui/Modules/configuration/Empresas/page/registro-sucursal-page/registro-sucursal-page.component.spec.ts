import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroSucursalPageComponent } from './registro-sucursal-page.component';

describe('RegistroSucursalPageComponent', () => {
  let component: RegistroSucursalPageComponent;
  let fixture: ComponentFixture<RegistroSucursalPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroSucursalPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistroSucursalPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
