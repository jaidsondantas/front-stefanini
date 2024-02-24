import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { ResultAfterCloseDialogE } from 'src/shared/enums/result-after-close-dialog.enum';
import { employeesMock } from 'src/shared/mocks/employee/consts';
import { MockEmployeeService } from 'src/shared/mocks/services/employee.service.mock';
import { MockToastrService } from 'src/shared/mocks/services/toastr.service.mock';
import { EmployeeService } from 'src/shared/services/employee.service';
import { EditEmployeeComponent } from './edit-employee.component';

describe('EditEmployeeComponent', () => {
  let component: EditEmployeeComponent;
  let formBuilder: FormBuilder;
  let employeeService: EmployeeService;
  let toastrService: ToastrService;
  let dialogRef: MatDialogRef<EditEmployeeComponent>;
  let fixture: ComponentFixture<EditEmployeeComponent>;

  beforeEach(() => {
    formBuilder = jasmine.createSpyObj('FormBuilder', ['group']);
    dialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [EditEmployeeComponent],
      providers: [
        { provide: EmployeeService, useClass: MockEmployeeService },
        { provide: ToastrService, useClass: MockToastrService },
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    });

    fixture = TestBed.createComponent(EditEmployeeComponent);
    employeeService = TestBed.inject(EmployeeService);
    toastrService = TestBed.inject(ToastrService);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.form).toBeDefined();
    expect(component.form.get('name')).toBeDefined();
    expect(component.form.get('age')).toBeDefined();
    expect(component.form.get('office')).toBeDefined();
    expect(component.id).toBeUndefined();
  });

  it('should patch form values when employee is defined', () => {
    const mockEmployee = employeesMock[0];
    delete mockEmployee.id;
    component.data = mockEmployee;
    component.employee = component.data;
    component.ngOnInit();
    expect(component.form.value).toEqual(mockEmployee);
  });

  it('should call employeeService.create when save is called with no id', () => {
    const mockEmployee = employeesMock[0];
    delete mockEmployee.id;
    component.form.patchValue(mockEmployee);
    spyOn(employeeService, 'create').and.returnValue(of(mockEmployee));
    component.save();
    expect(employeeService.create).toHaveBeenCalledWith(mockEmployee);
  });

  it('should call employeeService.update when save is called with id', () => {
    const mockId = '1';
    const mockEmployee = employeesMock[0];
    delete mockEmployee.id;
    component.id = mockId;
    component.form.patchValue(mockEmployee);
    spyOn(employeeService, 'update').and.returnValue(of(mockEmployee));
    component.save();
    expect(employeeService.update).toHaveBeenCalledWith(mockId, mockEmployee);
  });

  it('should call toaster.success and dialog.close with SUCCESS result when save is successful', async () => {
    const successMessage = 'Employee created successfully.';
    const mockEmployee = employeesMock[0];
    delete mockEmployee.id;
    component.form.patchValue(mockEmployee);

    spyOn(employeeService, 'create').and.returnValue(of(employeesMock[0]));
    spyOn(toastrService, 'success').and.callThrough();

    await component.save();

    expect(toastrService.success).toHaveBeenCalledWith(successMessage);
    expect(dialogRef.close).toHaveBeenCalledWith(
      ResultAfterCloseDialogE.SUCCESS
    );
  });

  it('should call toaster.error when save fails', () => {
    const mockEmployee = employeesMock[0];
    delete mockEmployee.id;
    component.form.patchValue(mockEmployee);

    spyOn(toastrService, 'error').and.callThrough();
    spyOn(employeeService, 'create').and.returnValue(
      throwError('Failed to save employee, try again')
    );

    component.save();
    expect(toastrService.error).toHaveBeenCalledWith(
      'Failed to save employee, try again'
    );
  });

  it('should unsubscribe when ngOnDestroy is called', () => {
    if (component.saveSubscription) {
      spyOn(component.saveSubscription, 'unsubscribe');
    }
    component.ngOnDestroy();
    if (component.saveSubscription) {
      expect(component.saveSubscription.unsubscribe).toHaveBeenCalled();
    }
  });
});
