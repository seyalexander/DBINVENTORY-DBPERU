import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetOpcionComponent } from './target-opcion.component';

describe('TargetOpcionComponent', () => {
  let component: TargetOpcionComponent;
  let fixture: ComponentFixture<TargetOpcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TargetOpcionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TargetOpcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
