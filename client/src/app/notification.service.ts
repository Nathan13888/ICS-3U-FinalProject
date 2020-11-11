import { Injectable } from '@angular/core';
import { NotificationType } from './notification/notification.component';

@Injectable()
export class NotificationService {

  notifications: Array<[NotificationType, string]> = [];

  constructor() {}

  push(notificationType: NotificationType, message: string): void {
    this.notifications.push([notificationType, message]);
  }

  delete(message: string, notificationType?: NotificationType): void {
    if (notificationType) {
      this.notifications = this.notifications.filter(obj => obj !== [notificationType, message]);
    } else {
      this.notifications = this.notifications.filter(obj => obj[1] !== message);
    }

  }

  clear(): void {
    this.notifications = [];
  }

}
