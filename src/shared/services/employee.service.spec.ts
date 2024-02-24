import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../interfaces/api-response.interface';
import { employeesMock } from '../mocks/employee/consts';
import { EmployeeService } from './employee.service';

const mockResultApi = {
  Items: [
    {
      office: 'Desenvolvedor',
      id: '7bf6f4f5-d933-4d51-8505-c01615804ab1',
      name: 'Jaidson Dantas',
      age: 32,
    },
    {
      office: 'Nenhum',
      id: '920f044e-a20b-4109-a9ec-95894a88db12',
      name: 'Geovanny Kriiger',
      age: 47,
    },
  ],
  Count: 2,
  ScannedCount: 2,
};

describe('EmployeeService', () => {
  let service: EmployeeService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmployeeService],
    });
    service = TestBed.inject(EmployeeService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make a POST request to create employee', () => {
    const employee = employeesMock[0];
    service.create(employee).subscribe((employee) => {
      expect(employee).toEqual(employee);
    });
    const req = httpTestingController.expectOne(
      `${environment.urlApi}/employees`
    );
    expect(req.request.method).toBe('POST');
    req.flush(employee);
  });

  it('should make a GET request to fetch employees', () => {
    const employee: ApiResponse = mockResultApi;
    service.get().subscribe((employees) => {
      expect(employees).toEqual(employee.Items);
    });
    const req = httpTestingController.expectOne(
      `${environment.urlApi}/employees`
    );
    expect(req.request.method).toBe('GET');
    req.flush(employee);
  });

  it('should make a GET request to fetch employee by id', () => {
    const id = '1';
    service.getById(id).subscribe((employee) => {
      expect(employee.id).toEqual(id);
    });
    const req = httpTestingController.expectOne(
      `${environment.urlApi}/employees/${id}`
    );
    expect(req.request.method).toBe('GET');
    req.flush({ id: id });
  });

  it('should make a PUT request to update employee', () => {
    const id = '1';
    const employee = employeesMock[0];
    service.update(id, employee).subscribe((employee) => {
      expect(employee).toEqual(employee);
    });
    const req = httpTestingController.expectOne(
      `${environment.urlApi}/employees/${id}`
    );
    expect(req.request.method).toBe('PUT');
    req.flush(employee);
  });

  it('should make a DELETE request to delete employee', () => {
    const id = '1';
    service.delete(id).subscribe((response) => {
      expect(response).toBeTruthy();
    });
    const req = httpTestingController.expectOne(
      `${environment.urlApi}/employees/${id}`
    );
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
