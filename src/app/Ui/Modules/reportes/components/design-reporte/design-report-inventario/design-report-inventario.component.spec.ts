import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignReportInventarioComponent } from './design-report-inventario.component';

describe('DesignReportInventarioComponent', () => {
  let component: DesignReportInventarioComponent;
  let fixture: ComponentFixture<DesignReportInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesignReportInventarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DesignReportInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
