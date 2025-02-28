import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionTargetsDatosComponent } from './section-targets-datos.component';

describe('SectionTargetsDatosComponent', () => {
  let component: SectionTargetsDatosComponent;
  let fixture: ComponentFixture<SectionTargetsDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionTargetsDatosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SectionTargetsDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
