import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateScoreMatchComponent } from './update-score-match.component';

describe('UpdateScoreMatchComponent', () => {
  let component: UpdateScoreMatchComponent;
  let fixture: ComponentFixture<UpdateScoreMatchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateScoreMatchComponent]
    });
    fixture = TestBed.createComponent(UpdateScoreMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
