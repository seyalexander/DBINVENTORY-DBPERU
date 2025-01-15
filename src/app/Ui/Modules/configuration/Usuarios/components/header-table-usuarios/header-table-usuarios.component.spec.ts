import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderTableUsuariosComponent } from './header-table-usuarios.component';

describe('HeaderTableUsuariosComponent', () => {
  let component: HeaderTableUsuariosComponent;
  let fixture: ComponentFixture<HeaderTableUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderTableUsuariosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderTableUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
