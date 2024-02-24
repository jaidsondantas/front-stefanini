import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/shared/interfaces/employee.interface';
import { EmployeeService } from 'src/shared/services/employee.service';
import { Subscription } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ResultAfterCloseDialogE } from '../../../shared/enums/result-after-close-dialog.enum';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EditEmployeeComponent implements OnInit, OnDestroy {
  form: FormGroup;
  id?: string;
  employee?: Employee;

  //Observables
  saveSubscription!: Subscription;
  deleteSubscription!: Subscription;
  enum = ResultAfterCloseDialogE;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly employeeService: EmployeeService,
    private toaster: ToastrService,
    public dialog: MatDialogRef<EditEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: Employee
  ) {
    this.form = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      office: new FormControl('', Validators.required),
    });

    this.id = data?.id;
    this.employee = data;
  }

  ngOnDestroy(): void {
    this.unsubscribe(this.saveSubscription);
    this.unsubscribe(this.deleteSubscription);
  }

  unsubscribe(sub: Subscription): void {
    if (sub) {
      sub.unsubscribe();
    }
  }

  ngOnInit(): void {
    if (this.employee) {
      this.form.patchValue({ ...this.employee });
    }
  }

  save(): void {
    if (this.form.valid) {
      const body: Employee = {
        ...this.form.value,
        age: Number(this.form.get('age')?.value),
      };

      const saveCallback = (successMessage: string) => {
        this.toaster.success(successMessage);
        this.close(ResultAfterCloseDialogE.SUCCESS);
      };

      const errorCallback = () => {
        this.toaster.error(`Failed to save employee, try again`);
      };

      if (this.id) {
        this.saveSubscription = this.employeeService
          .update(this.id, body)
          .subscribe({
            next: (res) => saveCallback(`Employee updated successfully.`),
            error: errorCallback,
          });
      } else {
        this.saveSubscription = this.employeeService.create(body).subscribe({
          next: (res) => saveCallback(`Employee created successfully.`),
          error: errorCallback,
        });
      }
    }
  }

  close(result: ResultAfterCloseDialogE): void {
    this.dialog.close(result);
  }
}
