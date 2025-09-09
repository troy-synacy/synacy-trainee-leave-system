import {Injectable} from '@angular/core';
import {LeaveApplication} from '../pages/manager/model/leave-application.interface';
import {HttpClient} from '@angular/common/http';
import {PaginatedLeaveApplication} from '../pages/admin/models/paginated-leave-application.interface';

@Injectable({
  providedIn: "root"
})

export class LeaveApplicationService {
  private URL: string = '/api/v1/leave/application';

  constructor(private readonly http: HttpClient) {}

  getAllPendingLeaveApplications(page: number, max: number) {
    return this.http.get<PaginatedLeaveApplication>(`${this.URL}/active?page=${page}&max=${max}`);
  }

  getAllNonPendingLeaveApplications(page: number, max: number){
    return this.http.get<PaginatedLeaveApplication>(`${this.URL}/history?page=${page}&max=${max}`);
  }

  getAllLPendingLeaveApplicationsByManagerId(managerId: number, page: number, max: number){
    return this.http.get<PaginatedLeaveApplication>(`${this.URL}/${managerId}/active?page=${page}&max=${max}`)
  }

  getAllNonPendingLeaveApplicationByManagerId(managerId: number, page: number, max: number){
      return this.http.get<PaginatedLeaveApplication>(`${this.URL}/${managerId}/history?page=${page}&max=${max}`)
  }

  changeStatusOfLeaveApplication(id: number, status: string) {
    return this.http.put<LeaveApplication>(`${this.URL}/${id}/status?leaveStatus=${status}`, {});
  }
}
