import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyTableEstadosComponent } from './body-table-estados.component';

describe('BodyTableEstadosComponent', () => {
  let component: BodyTableEstadosComponent;
  let fixture: ComponentFixture<BodyTableEstadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BodyTableEstadosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BodyTableEstadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
