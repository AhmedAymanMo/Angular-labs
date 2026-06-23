import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpperHeader } from './upper-header';

describe('UpperHeader', () => {
  let component: UpperHeader;
  let fixture: ComponentFixture<UpperHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpperHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(UpperHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
