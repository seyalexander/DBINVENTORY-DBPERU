import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignPagePortadaComponent } from './design-page-portada.component';

describe('DesignPagePortadaComponent', () => {
  let component: DesignPagePortadaComponent;
  let fixture: ComponentFixture<DesignPagePortadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesignPagePortadaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DesignPagePortadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
