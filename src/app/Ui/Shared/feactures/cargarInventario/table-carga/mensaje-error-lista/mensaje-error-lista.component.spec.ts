import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeErrorListaComponent } from './mensaje-error-lista.component';

describe('MensajeErrorListaComponent', () => {
  let component: MensajeErrorListaComponent;
  let fixture: ComponentFixture<MensajeErrorListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MensajeErrorListaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MensajeErrorListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
