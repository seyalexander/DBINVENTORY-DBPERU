import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonDescargaComponent } from './button-descarga.component';

describe('ButtonDescargaComponent', () => {
  let component: ButtonDescargaComponent;
  let fixture: ComponentFixture<ButtonDescargaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonDescargaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonDescargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
