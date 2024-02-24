import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewEmployeeComponent } from './view-employee.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Employee } from '../../../shared/interfaces/employee.interface';
import { ResultAfterCloseDialogE } from '../../../shared/enums/result-after-close-dialog.e';
import { employeesMock } from 'src/shared/mocks/employee/consts';

describe('ViewEmployeeComponent', () => {
  let component: ViewEmployeeComponent;
  let fixture: ComponentFixture<ViewEmployeeComponent>;
  let mockMatDialogData: Employee;

  beforeEach(() => {
    const mockDialogRef = {
      close: jasmine.createSpy('close'),
    };

    mockMatDialogData = employeesMock[0];

    TestBed.configureTestingModule({
      declarations: [ViewEmployeeComponent],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockMatDialogData },
      ],
    });

    fixture = TestBed.createComponent(ViewEmployeeComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize employee with data from MAT_DIALOG_DATA', () => {
    expect(component.employee).toEqual(mockMatDialogData);
  });
});
