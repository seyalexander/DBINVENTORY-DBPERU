import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewCargaInventariosComponent } from './preview-carga-inventarios.component';

describe('PreviewCargaInventariosComponent', () => {
  let component: PreviewCargaInventariosComponent;
  let fixture: ComponentFixture<PreviewCargaInventariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewCargaInventariosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreviewCargaInventariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
