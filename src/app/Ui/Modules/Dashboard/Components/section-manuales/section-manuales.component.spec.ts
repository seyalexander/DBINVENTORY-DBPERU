import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionManualesComponent } from './section-manuales.component';

describe('SectionManualesComponent', () => {
  let component: SectionManualesComponent;
  let fixture: ComponentFixture<SectionManualesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionManualesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SectionManualesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
