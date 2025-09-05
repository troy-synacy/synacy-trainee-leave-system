import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../pages/admin/models/user.interface';

@Injectable({
  providedIn: "root"
})

export class SharedService {
  private URL: string = "/api/v1/user";

  constructor(private readonly http: HttpClient) {}

  getAllUsers () {
    return this.http.get<User[]>(`${this.URL}s`);
  }
}
