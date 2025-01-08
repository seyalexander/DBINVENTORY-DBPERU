import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoUsuarioPageComponent } from './tipo-usuario-page.component';

describe('TipoUsuarioPageComponent', () => {
  let component: TipoUsuarioPageComponent;
  let fixture: ComponentFixture<TipoUsuarioPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoUsuarioPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TipoUsuarioPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
