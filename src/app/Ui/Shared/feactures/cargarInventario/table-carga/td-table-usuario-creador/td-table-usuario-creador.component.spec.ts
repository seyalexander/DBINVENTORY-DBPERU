import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TdTableUsuarioCreadorComponent } from './td-table-usuario-creador.component';

describe('TdTableUsuarioCreadorComponent', () => {
  let component: TdTableUsuarioCreadorComponent;
  let fixture: ComponentFixture<TdTableUsuarioCreadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TdTableUsuarioCreadorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TdTableUsuarioCreadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
