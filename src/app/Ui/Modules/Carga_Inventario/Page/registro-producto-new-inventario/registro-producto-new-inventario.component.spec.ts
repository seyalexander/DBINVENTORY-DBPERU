import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroProductoNewInventarioComponent } from './registro-producto-new-inventario.component';

describe('RegistroProductoNewInventarioComponent', () => {
  let component: RegistroProductoNewInventarioComponent;
  let fixture: ComponentFixture<RegistroProductoNewInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroProductoNewInventarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistroProductoNewInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
