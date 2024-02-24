import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterEmployeeComponent } from './filter-employee.component';

describe('FilterEmployeeComponent', () => {
  let component: FilterEmployeeComponent;
  let fixture: ComponentFixture<FilterEmployeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterEmployeeComponent],
    });
    fixture = TestBed.createComponent(FilterEmployeeComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have debounce time of 1000ms for filter value changes', (done) => {
    const spy = spyOn(component.changeValue, 'emit');
    component.ngOnInit();
    const newValue = 'DebouncedValue';
    const expectedValue = newValue.length > 1 ? newValue : '';

    component.filter.setValue(newValue);

    setTimeout(() => {
      expect(spy).toHaveBeenCalledWith(expectedValue);
      done();
    }, 1100);
  });
});
