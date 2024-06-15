import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewMinutesPage } from './new-minutes.page';

describe('NewMinutesPage', () => {
  let component: NewMinutesPage;
  let fixture: ComponentFixture<NewMinutesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMinutesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
