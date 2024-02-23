import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {debounceTime, Subscription} from 'rxjs';

@Component({
  selector: 'app-filter-employee',
  templateUrl: './filter-employee.component.html',
  styleUrls: ['./filter-employee.component.scss'],
})
export class FilterEmployeeComponent implements OnInit, OnDestroy {
  @Output() changeValue = new EventEmitter<string>();

  private filterSubscription!: Subscription;

  filter = new FormControl('');

  ngOnInit(): void {
    this.filterSubscription = this.filter.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe({
      next: (v) => {
        this.changeValue.emit(v.length > 1 ? v : '')
      },
    });
  }

  ngOnDestroy(): void {
    if (this.filterSubscription) {
      this.filterSubscription.unsubscribe();
    }
  }
}
