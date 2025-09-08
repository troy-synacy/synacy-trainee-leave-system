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

  getAllLeaveApplicationsByStatus(status: string, page: number, max: number) {
    return this.http.get<PaginatedLeaveApplication>(`${this.URL}/status?status=${status}&page=${page}&max=${max}`);
  }

  getAllLeaveApplicationsByManagerAndStatus(id: number | undefined, status: string, page: number, max: number) {
    return this.http.get<PaginatedLeaveApplication>(`${this.URL}s/manager/${id}?status=${status}&page=${page}&max=${max}`);
  }

  changeStatusOfLeaveApplication(id: number, status: string) {
    return this.http.put<LeaveApplication>(`${this.URL}/${id}/status?leaveStatus=${status}`, {});
  }
}
