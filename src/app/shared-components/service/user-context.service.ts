import {Injectable} from '@angular/core';
import {User} from '../../pages/admin/models/user.interface';

@Injectable({
  providedIn: "root"
})

export class UserContext {
  currentUser: User | undefined;

  setUser(user: User) {
    this.currentUser = user;
  }

  getUser() {
    return this.currentUser;
  }
}
