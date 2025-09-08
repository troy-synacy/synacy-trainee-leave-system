import {Injectable} from '@angular/core';
import {User} from '../../pages/admin/models/user.interface';

@Injectable({
  providedIn: "root"
})

export class UserContext {
  currentUser: User = {
    id: 1,
    name: 'HR',
    role: 'HR',
    totalLeaveCredits: 0,
    remainingLeaveCredits: 0,
    manager: null
  };

  setUser(user: User) {
    this.currentUser = user;
  }

  getUser() {
    return this.currentUser;
  }
}
