import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListEmployeeComponent } from './list-employee.component';
import { Employee } from '../../../shared/interfaces/employee.interface';

describe('ListEmployeeComponent', () => {
  let component: ListEmployeeComponent;
  let fixture: ComponentFixture<ListEmployeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListEmployeeComponent],
    });
    fixture = TestBed.createComponent(ListEmployeeComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial values set', () => {
    expect(component.employees).toEqual([]);
    expect(component.displayedColumns).toEqual([
      'id',
      'name',
      'age',
      'office',
      'actions',
    ]);
    expect(component.deleting).toEqual([]);
  });

  it('should emit edit event when editEmployee method is called', () => {
    const employee: Employee = {
      id: '1',
      name: 'Test Employee',
      age: 30,
      office: 'Sample Office',
    };
    spyOn(component.edit, 'emit');
    component.edit.emit(employee);
    expect(component.edit.emit).toHaveBeenCalledWith(employee);
  });

  it('should emit view event when viewEmployee method is called', () => {
    const employee: Employee = {
      id: '2',
      name: 'Another Employee',
      age: 25,
      office: 'New Office',
    };
    spyOn(component.view, 'emit');
    component.view.emit(employee);
    expect(component.view.emit).toHaveBeenCalledWith(employee);
  });

  it('should emit delete event when deleteEmployee method is called with employee ID', () => {
    const employeeId = '3';
    spyOn(component.delete, 'emit');
    component.delete.emit(employeeId);
    expect(component.delete.emit).toHaveBeenCalledWith(employeeId);
  });
});
