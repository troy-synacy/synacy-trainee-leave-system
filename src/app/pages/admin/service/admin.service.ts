import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Manager} from '../models/manager.interface';
import {UserRequestDTO} from '../models/user-request-DTO.interface';
import {User} from '../models/user.interface';

@Injectable({
  providedIn: "root"
})

export class AdminService {
  private URL = '/api/v1/user';

  constructor(private readonly http: HttpClient) {}

  getAllManagers () {
    return this.http.get<Manager[]>(`${this.URL}/managers`);
  }

  saveUser (userRequest: UserRequestDTO) {
    return this.http.post<User>(this.URL, userRequest)
  }
}

