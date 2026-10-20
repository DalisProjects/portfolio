import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewspageComponent } from './reviewspage.component';

describe('ReviewspageComponent', () => {
  let component: ReviewspageComponent;
  let fixture: ComponentFixture<ReviewspageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewspageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
