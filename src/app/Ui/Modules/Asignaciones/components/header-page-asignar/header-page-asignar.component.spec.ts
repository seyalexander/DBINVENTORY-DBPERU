import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderPageAsignarComponent } from './header-page-asignar.component';

describe('HeaderPageAsignarComponent', () => {
  let component: HeaderPageAsignarComponent;
  let fixture: ComponentFixture<HeaderPageAsignarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderPageAsignarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderPageAsignarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
