import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVaccinsComponent } from './list-vaccins.component';

describe('ListVaccinsComponent', () => {
  let component: ListVaccinsComponent;
  let fixture: ComponentFixture<ListVaccinsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListVaccinsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListVaccinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
