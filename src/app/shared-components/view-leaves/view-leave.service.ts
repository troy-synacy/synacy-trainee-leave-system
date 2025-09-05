import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LeaveRequest} from '../../pages/manager/model/leave-application.interface';

@Injectable({
  providedIn: "root"
})
export class ViewLeaveService {
  private URL = '/api/v1/users';

  constructor(private http: HttpClient) {}

  getLeaves(userId: number) {
    return this.http.get<LeaveRequest[]>(`${this.URL}/${userId}/leave-applications`);
  }

  cancelLeave(leaveId: number) {
    return this.http.put<void>(
      `/api/v1/leave/application/${leaveId}/status?leaveStatus=CANCELLED`,
      {}
    );
  }
}
