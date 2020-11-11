import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  @Output()
  public delete: EventEmitter<string> = new EventEmitter();

  @Input()
  public notificationType: NotificationType = NotificationType.INFO;

  constructor() {}

  ngOnInit(): void {
  }

}

export enum NotificationType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
}
