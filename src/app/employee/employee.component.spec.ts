import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { LoadingModule } from 'src/shared/components/loading/loading.module';
import { employeesMock } from 'src/shared/mocks/employee/consts';
import { EmployeeService } from '../../shared/services/employee.service';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { EmployeeComponent } from './employee.component';
import { FilterEmployeeComponent } from './filter-employee/filter-employee.component';
import { HeaderEmployeeComponent } from './header-employee/header-employee.component';
import { ListEmployeeComponent } from './list-employee/list-employee.component';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';

class MockEmployeeService {
  get() {
    return of([{ id: 1, name: 'John Doe' }]);
  }

  delete(id: number) {
    return of(true);
  }
}

class MockToastrService {
  error(message: string): void {}

  success(message: string): void {}
}

describe('EmployeeComponent', () => {
  let component: EmployeeComponent;
  let fixture: ComponentFixture<EmployeeComponent>;
  let employeeService: EmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        EmployeeComponent,
        EditEmployeeComponent,
        ViewEmployeeComponent,
        ListEmployeeComponent,
        HeaderEmployeeComponent,
        FilterEmployeeComponent,
      ],
      imports: [
        BrowserAnimationsModule,
        MatDialogModule,
        ToastrModule,
        MatButtonModule,
        MatTableModule,
        FormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        ReactiveFormsModule,
        MatPaginatorModule,
        MatDatepickerModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatNativeDateModule,
        MatProgressSpinnerModule,
        LoadingModule,
        MatDialogModule,
      ],
      providers: [
        { provide: EmployeeService, useClass: MockEmployeeService },
        { provide: ToastrService, useClass: MockToastrService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeComponent);
    component = fixture.componentInstance;
    employeeService = TestBed.inject(EmployeeService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch employees on initialization', () => {
    spyOn(employeeService, 'get').and.callThrough();
    component.ngOnInit();
    expect(employeeService.get).toHaveBeenCalled();
  });

  it('should filter employees based on input string', () => {
    const filterString = 'John';
    component.employeesFull = employeesMock;
    component.doFilter(filterString);
    expect(component.employees.length).toBe(1);
    expect(component.employees[0].name).toBe('John Doe');
  });

  it('should open edit dialog when adding employee', () => {
    spyOn(component, 'openDialog');
    component.goPageAdd();
    expect(component.openDialog).toHaveBeenCalled();
  });

  it('should open edit dialog when editing employee', () => {
    spyOn(component, 'openDialog');
    const employee = employeesMock[0];
    component.goEdit(employee);
    expect(component.openDialog).toHaveBeenCalledWith(employee);
  });

  it('should remove employee', () => {
    spyOn(employeeService, 'delete').and.callThrough();
    const id = 1;
    component.remove(id);
    expect(employeeService.delete).toHaveBeenCalledWith(id);
  });

  it('should handle successful removal of employee', () => {
    spyOn(component, 'getEmployees');
    const id = 1;
    component.remove(id);
    expect(component.getEmployees).toHaveBeenCalled();
  });
});
