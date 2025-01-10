import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonNuevoComponent } from './button-nuevo.component';

describe('ButtonNuevoComponent', () => {
  let component: ButtonNuevoComponent;
  let fixture: ComponentFixture<ButtonNuevoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonNuevoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
