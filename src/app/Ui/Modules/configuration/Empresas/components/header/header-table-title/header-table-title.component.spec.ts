import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderTableTitleComponent } from './header-table-title.component';

describe('HeaderTableTitleComponent', () => {
  let component: HeaderTableTitleComponent;
  let fixture: ComponentFixture<HeaderTableTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderTableTitleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderTableTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
