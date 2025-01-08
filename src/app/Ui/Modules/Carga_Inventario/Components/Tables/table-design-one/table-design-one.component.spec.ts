import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDesignOneComponent } from './table-design-one.component';

describe('TableDesignOneComponent', () => {
  let component: TableDesignOneComponent;
  let fixture: ComponentFixture<TableDesignOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableDesignOneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableDesignOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
