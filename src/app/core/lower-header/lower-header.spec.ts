import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LowerHeader } from './lower-header';

describe('LowerHeader', () => {
  let component: LowerHeader;
  let fixture: ComponentFixture<LowerHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LowerHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(LowerHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
