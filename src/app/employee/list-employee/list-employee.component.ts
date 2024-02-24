import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { Employee } from '../../../shared/interfaces/employee.interface';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ListEmployeeComponent {
  @Input() employees: Employee[] = [];
  @Output() edit = new EventEmitter<Employee>();
  @Output() view = new EventEmitter<Employee>();
  @Output() delete = new EventEmitter<string>();

  displayedColumns: string[] = ['id', 'name', 'age', 'office', 'actions'];

  deleting: string[] = [];
}
