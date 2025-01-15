import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderPageTableTipoUsuarioComponent } from './header-page-table-tipo-usuario.component';

describe('HeaderPageTableTipoUsuarioComponent', () => {
  let component: HeaderPageTableTipoUsuarioComponent;
  let fixture: ComponentFixture<HeaderPageTableTipoUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderPageTableTipoUsuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderPageTableTipoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
