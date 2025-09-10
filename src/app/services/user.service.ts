import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from '../models/user.interface';
import {Manager} from '../models/manager.interface';
import {UserRequestDTO} from '../models/user-request-DTO.interface';
import {PaginatedUsers} from '../models/paginated-users.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private URL = '/api/v1/user'; // matches your backend

  constructor(private http: HttpClient) {}

  getAllUsers () {
    return this.http.get<User[]>(`${this.URL}`);
  }

  getUserById(id: string | null): Observable<User> {
    return this.http.get<User>(`${this.URL}/${id}`);
  }

  getAllManagers () {
    return this.http.get<Manager[]>(`${this.URL}/managers`);
  }

  getPaginatedUsers (pageNumber: number, pageSize: number) {
    return this.http.get<PaginatedUsers>(`${this.URL}/paginated?page=${pageNumber}&size=${pageSize}`);
  }

  saveUser (userRequest: UserRequestDTO) {
    return this.http.post<User>(this.URL, userRequest);
  }

  getCurrentUserById(userId: number) {
    return this.http.get<User>(`${this.URL}/${userId}`)
  }

  updateUser(userId: string | null, userRequest: UserRequestDTO) {
    return this.http.put<User>(`${this.URL}/${userId}`, userRequest);
  }
}
