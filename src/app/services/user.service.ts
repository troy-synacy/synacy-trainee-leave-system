import {Injectable} from '@angular/core';

@Injectable({
  providedIn: "root"
})

export class UserService {
  private URL: String = "/api/v1/user";
}
