import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {LeaveApplication, LeaveRequest} from '../../manager/model/leave-application.interface';

@Injectable({
  providedIn: "root"
})

export class AllLeavesService {
  private URL = '/api/v1/leave/application';
  constructor(private http: HttpClient) {}

  getAllLeaveApplications(): Observable<LeaveApplication[]> {
    return this.http.get<LeaveApplication[]>(this.URL);
  }
}
