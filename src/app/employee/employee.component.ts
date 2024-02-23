import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {EmployeeService} from '../../shared/services/employee.service';
import {Employee} from '../../shared/interfaces/employee.interface';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {LoadingService} from '../../shared/components/loading/loading.service';
import {MatDialog} from '@angular/material/dialog';
import {EditEmployeeComponent} from './edit-employee/edit-employee.component';
import {ViewEmployeeComponent} from './view-employee/view-employee.component';
import {ResultAfterCloseDialogE} from '../../shared/enums/result-after-close-dialog.e';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EmployeeComponent implements OnInit, OnDestroy {
  employees: Employee[] = [];
  employeesFull: Employee[] = []
  filter: string = '';
  loading!: boolean;
  private deleteSubscription!: Subscription;
  private dialogSubscription!: Subscription;

  constructor(
    private readonly employeeService: EmployeeService,
    private readonly router: Router,
    private readonly toastr: ToastrService,
    private readonly loadingService: LoadingService,
    private readonly dialog: MatDialog
  ) {
  }

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
    this.loadingService.showLoading()
    this.employeeService.get().subscribe({
      next: (employees) => {
        this.employees = employees;
        this.employeesFull = [...employees];
      },
      error: (error) => {
        this.toastr.error(error.message);
      }
    });
  }

  goPageAdd(): void {
    this.openDialog();
  }

  private openDialog(employee?: Employee) {
    this.dialogSubscription = this.dialog.open(EditEmployeeComponent, {
      data: employee
    }).afterClosed().subscribe({
      next: (result: ResultAfterCloseDialogE) => {
        if (result === ResultAfterCloseDialogE.SUCCESS) {
          this.getEmployees();
        }
      }
    })
  }

  goEdit(employee: Employee): void {
    this.openDialog(employee);
  }

  goView(employee: Employee): void {
    this.dialogSubscription = this.dialog.open(ViewEmployeeComponent, {
      data: employee
    }).afterClosed().subscribe({
      next: (result: ResultAfterCloseDialogE) => {
        if (result === ResultAfterCloseDialogE.SUCCESS) {
          this.getEmployees();
        }
      }
    })
  }

  doFilter(str: string): void {
    this.employees = this.employeesFull.filter(e => e.name.toLowerCase().includes(str.toLowerCase()));
  }

  remove(id: number): void {
    if (id)
      this.deleteSubscription = this.employeeService.delete(id).subscribe({
        next: () => {
          this.toastr.success(`Successfully removed.`);
          this.getEmployees();
        },
      });
  }
}
