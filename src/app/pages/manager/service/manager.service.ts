import { Injectable } from '@angular/core';
import {LeaveRequest} from '../model/leave-application.interface';
import {HttpClient} from '@angular/common/http';
import {User} from '../../admin/models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  private URL = '/api/v1/leave/application'

  constructor(private readonly http: HttpClient) {
  }

  applyLeave(leaveRequest: LeaveRequest) {
    return this.http.post(this.URL, leaveRequest);
  }

  getUserById(userId: string | null) {
    return this.http.get<User>(`${this.URL}/${userId}`)
  }
}
