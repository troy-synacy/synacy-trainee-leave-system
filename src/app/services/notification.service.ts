import {Injectable, signal} from '@angular/core';
import {NotificationData} from '../models/notification-data.interface';

@Injectable({
  providedIn: "root"
})

export class NotificationService {
  readonly notificationListener = signal<NotificationData | null>(null);

  success (message: string) {
    this.notificationListener.set({message, type: 'success'})
  }

  clear(){
    this.notificationListener.set(null)
  }
}
