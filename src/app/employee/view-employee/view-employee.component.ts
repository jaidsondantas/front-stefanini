import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ResultAfterCloseDialogE } from '../../../shared/enums/result-after-close-dialog.e';
import { Employee } from '../../../shared/interfaces/employee.interface';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ViewEmployeeComponent {
  employee: Employee;
  enum = ResultAfterCloseDialogE;

  constructor(
    public dialog: MatDialogRef<ViewEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee
  ) {
    this.employee = data;
  }
}
