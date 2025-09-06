import {Injectable} from '@angular/core';
import {LeaveApplication} from '../pages/manager/model/leave-application.interface';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: "root"
})

export class LeaveApplicationService {
  private URL: string = '/api/v1/leave/application';

  constructor(private readonly http: HttpClient) {}

  getAllLeaveApplications() {
    return this.http.get<LeaveApplication[]>(this.URL);
  }

  getAllLeaveApplicationsByManager(id: number | undefined){
    return this.http.get<LeaveApplication[]>(`${this.URL}s/manager/${id}`);
  }

  changeStatusOfLeaveApplication(id: number, status: string) {
    return this.http.put<LeaveApplication>(`${this.URL}/${id}/status?leaveStatus=${status}`, {});
  }
}
