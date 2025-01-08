import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageEmptyListComponent } from './message-empty-list.component';

describe('MessageEmptyListComponent', () => {
  let component: MessageEmptyListComponent;
  let fixture: ComponentFixture<MessageEmptyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageEmptyListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MessageEmptyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
