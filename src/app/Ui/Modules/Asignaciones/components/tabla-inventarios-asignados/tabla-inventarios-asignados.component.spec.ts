import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaInventariosAsignadosComponent } from './tabla-inventarios-asignados.component';

describe('TablaInventariosAsignadosComponent', () => {
  let component: TablaInventariosAsignadosComponent;
  let fixture: ComponentFixture<TablaInventariosAsignadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaInventariosAsignadosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TablaInventariosAsignadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
