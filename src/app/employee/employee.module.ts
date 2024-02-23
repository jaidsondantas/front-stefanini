import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EmployeeComponent} from './employee.component';
import {RouterModule, Routes} from '@angular/router';
import {HeaderEmployeeComponent} from './header-employee/header-employee.component';
import {MatButtonModule} from '@angular/material/button';
import {ListEmployeeComponent} from './list-employee/list-employee.component';
import {MatTableModule} from '@angular/material/table';
import {FilterEmployeeComponent} from './filter-employee/filter-employee.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {EditEmployeeComponent} from './edit-employee/edit-employee.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatNativeDateModule} from '@angular/material/core';
import {ViewEmployeeComponent} from './view-employee/view-employee.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {LoadingModule} from '../../shared/components/loading/loading.module';
import {MatDialogModule} from '@angular/material/dialog';

const routes: Routes = [
  {path: 'list', component: EmployeeComponent},
  {
    path: '**',
    redirectTo: 'list'
  }
];

@NgModule({
  declarations: [
    EmployeeComponent,
    HeaderEmployeeComponent,
    ListEmployeeComponent,
    FilterEmployeeComponent,
    EditEmployeeComponent,
    ViewEmployeeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
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
    MatDialogModule
  ],
})
export class EmployeeModule {
}
