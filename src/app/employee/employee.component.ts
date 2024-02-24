import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ResultAfterCloseDialogE } from '../../shared/enums/result-after-close-dialog.enum';
import { Employee } from '../../shared/interfaces/employee.interface';
import { EmployeeService } from '../../shared/services/employee.service';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EmployeeComponent implements OnInit, OnDestroy {
  employees: Employee[] = [];
  employeesFull: Employee[] = [];
  filter: string = '';
  loading!: boolean;
  private deleteSubscription!: Subscription;
  private dialogSubscription!: Subscription;

  constructor(
    private readonly employeeService: EmployeeService,
    private readonly toastr: ToastrService,
    private readonly dialog: MatDialog
  ) {}

  ngOnDestroy(): void {
    this.unsubscribe(this.deleteSubscription);
    this.unsubscribe(this.dialogSubscription);
  }

  unsubscribe(sub: Subscription): void {
    if (sub) {
      sub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.get().subscribe({
      next: (employees) => this.handleGetEmployeesSuccess(employees),
      error: (error) => this.handleGetEmployeesError(error),
    });
  }

  handleGetEmployeesSuccess(employees: any[]): void {
    this.employees = employees;
    this.employeesFull = [...employees];
  }

  handleGetEmployeesError(error: any): void {
    this.toastr.error(error.message);
  }

  goPageAdd(): void {
    this.openDialog(EditEmployeeComponent);
  }

  openDialog(component: any, data?: Employee): void {
    this.dialogSubscription = this.dialog
      .open(component, { data })
      .afterClosed()
      .subscribe((result: ResultAfterCloseDialogE) => {
        this.handleDialogResult(result);
      });
  }

  handleDialogResult(result: ResultAfterCloseDialogE): void {
    if (result === ResultAfterCloseDialogE.SUCCESS) {
      this.getEmployees();
    }
  }

  goEdit(employee: Employee): void {
    this.openDialog(EditEmployeeComponent, employee);
  }

  goView(employee: Employee): void {
    this.openDialog(ViewEmployeeComponent, employee);
  }

  doFilter(str: string): void {
    this.employees = this.employeesFull.filter((e) =>
      e.name.toLowerCase().includes(str.toLowerCase())
    );
  }

  remove(id: string): void {
    if (!id) {
      return;
    }

    this.deleteSubscription = this.employeeService.delete(id).subscribe({
      next: () => {
        this.handleDeleteSuccess();
      },
    });
  }

  handleDeleteSuccess(): void {
    this.toastr.success(`Successfully removed.`);
    this.getEmployees();
  }
}
