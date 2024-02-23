import {Employee} from './employee.interface';

export interface ApiResponse {
  Items: Employee[];
  Count: number;
  ScannedCount: number;
}
