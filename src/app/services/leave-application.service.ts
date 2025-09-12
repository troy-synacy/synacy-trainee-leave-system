import {Injectable} from '@angular/core';
import {LeaveApplication} from '../models/leave-application.interface';
import {HttpClient} from '@angular/common/http';
import {PaginatedLeaveApplication} from '../models/paginated-leave-application.interface';
import {LeaveRequest} from '../models/leave-application-request.interface';

@Injectable({
  providedIn: "root"
})

export class LeaveApplicationService {
  private URL: string = '/api/v1/leave-application';

  constructor(private readonly http: HttpClient) {}

  getLeaveApplicationsByStatus(status: string, page: number, max: number) {
    return this.http.get<PaginatedLeaveApplication>(`${this.URL}/active?status=${status}&page=${page}&max=${max}`);
  }

  getLeaveApplicationsByStatusNot(status: string, page: number, max: number){
    return this.http.get<PaginatedLeaveApplication>(`${this.URL}/history?status=${status}&page=${page}&max=${max}`);
  }

  getLeaveApplicationsByManagerIdAndStatus(managerId: number, status: string, page: number, max: number){
    return this.http.get<PaginatedLeaveApplication>(`${this.URL}/${managerId}/active?status=${status}&page=${page}&max=${max}`)
  }

  getLeaveApplicationByManagerIdByStatusNot(managerId: number, status: string, page: number, max: number){
    return this.http.get<PaginatedLeaveApplication>(`${this.URL}/${managerId}/history?status=${status}&page=${page}&max=${max}`)
  }

  changeStatusOfLeaveApplication(id: number, status: string, approverId: number) {
    return this.http.put<LeaveApplication>(`${this.URL}/${id}/${approverId}/status?leaveStatus=${status}`, {});
  }

  applyLeave(leaveRequest: LeaveRequest) {
    return this.http.post(this.URL, leaveRequest);
  }

  getLeaves(userId: number, page: number, max: number) {
    return this.http.get<PaginatedLeaveApplication>(`${this.URL}/${userId}?page=${page}&max=${max}`);
  }
}
