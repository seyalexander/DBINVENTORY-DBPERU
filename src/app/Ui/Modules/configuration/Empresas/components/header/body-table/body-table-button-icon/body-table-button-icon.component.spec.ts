import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyTableButtonIconComponent } from './body-table-button-icon.component';

describe('BodyTableButtonIconComponent', () => {
  let component: BodyTableButtonIconComponent;
  let fixture: ComponentFixture<BodyTableButtonIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BodyTableButtonIconComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BodyTableButtonIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
