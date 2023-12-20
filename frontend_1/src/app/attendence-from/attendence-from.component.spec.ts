import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendenceFromComponent } from './attendence-from.component';

describe('AttendenceFromComponent', () => {
  let component: AttendenceFromComponent;
  let fixture: ComponentFixture<AttendenceFromComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttendenceFromComponent]
    });
    fixture = TestBed.createComponent(AttendenceFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
