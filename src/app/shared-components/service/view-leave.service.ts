import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LeaveApplication} from '../../pages/manager/model/leave-application.interface';

@Injectable({
  providedIn: "root"
})
export class ViewLeaveService {
  private URL = '/api/v1/users';

  constructor(private http: HttpClient) {}

  getLeaves(userId: number | undefined) {
    return this.http.get<LeaveApplication[]>(`${this.URL}/${userId}/leave-applications`);
  }

  cancelLeave(leaveId: number | undefined, cancelStatus: string) {
    return this.http.put<void>(
      `/api/v1/leave/application/${leaveId}/status?leaveStatus=CANCELLED`,
      {}
    );
  }
}
