import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Manager} from '../models/manager.interface';
import {UserRequestDTO} from '../models/user-request-DTO.interface';
import {User} from '../models/user.interface';
import {PaginatedUsers} from '../models/paginated-users.interface';

@Injectable({
  providedIn: "root"
})

export class AdminService {
  private URL = '/api/v1/user';

  constructor(private readonly http: HttpClient) {}

  getAllManagers () {
    return this.http.get<Manager[]>(`${this.URL}/managers`);
  }

  getAllUsers (pageNumber: number, pageSize: number) {
    return this.http.get<PaginatedUsers>(`${this.URL}s/paginated?page=${pageNumber}&size=${pageSize}`);
  }

  saveUser (userRequest: UserRequestDTO) {
    return this.http.post<User>(this.URL, userRequest);
  }

  getUserById(userId: string | null) {
    return this.http.get<User>(`${this.URL}/${userId}`)
  }

  updateUser(userId: string | null, userRequest: UserRequestDTO) {
    return this.http.put<User>(`${this.URL}/${userId}`, userRequest);
  }

}

