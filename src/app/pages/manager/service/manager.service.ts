import { Injectable } from '@angular/core';
import {LeaveRequest} from '../model/leave-application.interface';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ManagerService {
  private URL = '/api/v1/leave/application'

  constructor(private readonly http: HttpClient) {
  }

  createLeave(leaveRequest: LeaveRequest) {
    return this.http.post(this.URL, leaveRequest);
  }
}
