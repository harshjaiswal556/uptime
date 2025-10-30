import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubNavbar } from './sub-navbar';

describe('SubNavbar', () => {
  let component: SubNavbar;
  let fixture: ComponentFixture<SubNavbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubNavbar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubNavbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
