import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from '../pages/admin/models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private URL = '/api/v1/user'; // matches your backend

  constructor(private http: HttpClient) {}

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.URL}/${id}`);
  }
}
