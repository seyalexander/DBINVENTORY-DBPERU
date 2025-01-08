import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyTableButtonComponent } from './body-table-button.component';

describe('BodyTableButtonComponent', () => {
  let component: BodyTableButtonComponent;
  let fixture: ComponentFixture<BodyTableButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BodyTableButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BodyTableButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
