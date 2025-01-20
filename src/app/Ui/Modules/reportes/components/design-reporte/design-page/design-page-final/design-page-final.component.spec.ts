import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignPageFinalComponent } from './design-page-final.component';

describe('DesignPageFinalComponent', () => {
  let component: DesignPageFinalComponent;
  let fixture: ComponentFixture<DesignPageFinalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesignPageFinalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DesignPageFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
