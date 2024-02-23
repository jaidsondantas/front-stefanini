import {Component, EventEmitter, Input, Output, ViewEncapsulation,} from '@angular/core';

@Component({
  selector: 'app-header-employee',
  templateUrl: './header-employee.component.html',
  styleUrls: ['./header-employee.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderEmployeeComponent {
  @Input() title = '';
  @Input() showButton: boolean = true;
  @Input() labelButton!: string;

  @Output() clickedButton = new EventEmitter<void>();

  eventAction(): void {
    this.clickedButton.emit();
  }
}
