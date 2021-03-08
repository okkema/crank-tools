import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudDialogComponent } from './crud-dialog.component';

describe('CrudDialogComponent', () => {
  let component: CrudDialogComponent;
  let fixture: ComponentFixture<CrudDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
