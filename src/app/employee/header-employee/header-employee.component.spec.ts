import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderEmployeeComponent } from './header-employee.component';

describe('HeaderEmployeeComponent', () => {
  let component: HeaderEmployeeComponent;
  let fixture: ComponentFixture<HeaderEmployeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderEmployeeComponent],
    });
    fixture = TestBed.createComponent(HeaderEmployeeComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial values set', () => {
    expect(component.title).toEqual('');
    expect(component.showButton).toBe(true);
    expect(component.labelButton).toBeUndefined(); // As it's marked as "!"
  });

  it('should emit clickedButton event when eventAction method is called', () => {
    spyOn(component.clickedButton, 'emit');
    component.eventAction();
    expect(component.clickedButton.emit).toHaveBeenCalled();
  });

  it('should not show button if showButton input is set to false', () => {
    component.showButton = false;
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button).toBeNull();
  });
});
