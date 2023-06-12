import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCompDetailComponent } from './add-comp-detail.component';

describe('AddCompDetailComponent', () => {
  let component: AddCompDetailComponent;
  let fixture: ComponentFixture<AddCompDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCompDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCompDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
