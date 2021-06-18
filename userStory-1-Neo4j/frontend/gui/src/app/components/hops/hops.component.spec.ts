import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HopsComponent } from './hops.component';

describe('HopsComponent', () => {
  let component: HopsComponent;
  let fixture: ComponentFixture<HopsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HopsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
