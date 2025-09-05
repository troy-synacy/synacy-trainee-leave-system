import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: "root"
})

export class UserSignalService {
  readonly refreshUsers = signal(0);

  triggerRefreshUsers() {
    this.refreshUsers.update(n => n + 1);
  }
 }
