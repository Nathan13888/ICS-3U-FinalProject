import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { NotificationService } from 'src/app/notification.service';
import { NotificationType } from 'src/app/notification/notification.component';
import { User, UserControllerService } from 'src/app/openapi';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  editMode = false;

  user: User | undefined;

  userForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    role: new FormControl(''),
    grade: new FormControl(1),
  });

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public notificationService: NotificationService,
    public userControllerService: UserControllerService) {    }

  ngOnInit(): void {}

  createUser(): void {
    console.log(this.userForm.value);
    this.user = {
      firstName: this.userForm.controls.firstName.value,
      lastName: this.userForm.controls.lastName.value,
      email: this.userForm.controls.email.value,
      role: this.userForm.controls.role.value,
      grade: this.userForm.controls.grade.value,
    };
    this.userControllerService.userControllerCreate(this.user).pipe(first())
    .subscribe(user => {
      if (user.id) {
        this.router.navigate([`/user/${user.id}`]);
      } else {
        console.error();
        this.notificationService.push(NotificationType.ERROR, 'Server gave no user id!');
      }
    }, (err: HttpErrorResponse) => {
      console.error(err);
      this.notificationService.push(NotificationType.ERROR, err.message);
    });
  }

}
