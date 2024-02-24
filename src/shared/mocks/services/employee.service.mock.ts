import { Observable, of } from 'rxjs';
import { Employee } from 'src/shared/interfaces/employee.interface';
import { employeesMock } from '../employee/consts';

export class MockEmployeeService {
  get() {
    return of(employeesMock);
  }

  delete(id: string) {
    return of();
  }

  create(body: Employee): Observable<Employee> {
    return of();
  }

  update(id: string, body: Employee): Observable<Employee> {
    return of();
  }
}
