import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendPlacesComponent } from './recommend-places.component';

describe('RecommendPlacesComponent', () => {
  let component: RecommendPlacesComponent;
  let fixture: ComponentFixture<RecommendPlacesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecommendPlacesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendPlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
