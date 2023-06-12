import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillPdfGenratorComponent } from './bill-pdf-genrator.component';

describe('BillPdfGenratorComponent', () => {
  let component: BillPdfGenratorComponent;
  let fixture: ComponentFixture<BillPdfGenratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillPdfGenratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillPdfGenratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
