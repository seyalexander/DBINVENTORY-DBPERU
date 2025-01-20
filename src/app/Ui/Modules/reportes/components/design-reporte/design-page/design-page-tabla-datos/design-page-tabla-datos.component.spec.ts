import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignPageTablaDatosComponent } from './design-page-tabla-datos.component';

describe('DesignPageTablaDatosComponent', () => {
  let component: DesignPageTablaDatosComponent;
  let fixture: ComponentFixture<DesignPageTablaDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesignPageTablaDatosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DesignPageTablaDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
