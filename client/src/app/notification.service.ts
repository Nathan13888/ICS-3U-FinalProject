import { Injectable } from '@angular/core';
import { NotificationType } from './notification/notification.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  notifications: Array<[NotificationType, string]>;

  constructor() {
    this.notifications = [];
  }

  push(notificationType: NotificationType, message: string): void {
    this.notifications.push([notificationType, message]);
  }

  delete(message: string, notificationType?: NotificationType): void {
    if (notificationType) {
      this.notifications = this.notifications.filter(obj => obj !== [notificationType, message]);
    } else {
      this.notifications = this.notifications.filter(obj => {
        console.log(obj[1] !== message);
        return obj[1] !== message;
      });
    }

  }

  clear(): void {
    this.notifications = [];
  }

}
