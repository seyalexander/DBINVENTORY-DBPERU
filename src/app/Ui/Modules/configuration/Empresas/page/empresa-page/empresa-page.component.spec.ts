import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaPageComponent } from './empresa-page.component';

describe('EmpresaPageComponent', () => {
  let component: EmpresaPageComponent;
  let fixture: ComponentFixture<EmpresaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpresaPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmpresaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
