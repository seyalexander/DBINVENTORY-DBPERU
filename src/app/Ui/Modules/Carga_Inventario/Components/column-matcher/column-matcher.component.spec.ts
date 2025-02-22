import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnMatcherComponent } from './column-matcher.component';

describe('ColumnMatcherComponent', () => {
  let component: ColumnMatcherComponent;
  let fixture: ComponentFixture<ColumnMatcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColumnMatcherComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ColumnMatcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
