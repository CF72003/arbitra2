import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MinutesPage } from './minutes.page';

describe('MinutesPage', () => {
  let component: MinutesPage;
  let fixture: ComponentFixture<MinutesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MinutesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
