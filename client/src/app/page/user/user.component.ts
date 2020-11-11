import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first} from 'rxjs/operators';
import { NotificationService } from 'src/app/notification.service';
import { NotificationType } from 'src/app/notification/notification.component';
import { User, UserControllerService } from 'src/app/openapi';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  editMode = false;

  user!: User;
  id!: string;

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
    public userControllerService: UserControllerService) {}

  ngOnInit(): void {
    const paramId = this.route.snapshot.paramMap.get('id');
    if (paramId) {
      this.id = paramId;
      this.userControllerService.userControllerFindById(this.id).pipe(first())
      .subscribe(user => {
        this.user = user as User;
        if (this.user.firstName) { this.userForm.controls.firstName.setValue(this.user.firstName); }
        if (this.user.lastName) { this.userForm.controls.lastName.setValue(this.user.lastName); }
        if (this.user.email) { this.userForm.controls.email.setValue(this.user.email); }
        if (this.user.role) { this.userForm.controls.role.setValue(this.user.role); }
        if (this.user.grade) { this.userForm.controls.grade.setValue(this.user.grade); }
      }, (err: HttpErrorResponse) => {
        console.error(err);
        this.notificationService.push(NotificationType.ERROR, err.message);
        this.router.navigate(['/']);
      });
    } else {
      this.router.navigate(['/']);
    }
  }

  toggleEdit(): void {
    this.editMode = !this.editMode;
  }

  saveUser(): void {
    this.notificationService.clear();
    console.log(this.id);
    console.log(this.userForm.value);
    this.userControllerService.userControllerUpdateById(
      this.id,
      this.userForm.value,
      ).pipe(first()).subscribe(res => {
        this.userControllerService.userControllerFindById(this.id).pipe(first())
        .subscribe(user => {
          this.user = user as User;
          if (this.user.firstName) { this.userForm.controls.firstName.setValue(this.user.firstName); }
          if (this.user.lastName) { this.userForm.controls.lastName.setValue(this.user.lastName); }
          if (this.user.email) { this.userForm.controls.email.setValue(this.user.email); }
          if (this.user.role) { this.userForm.controls.role.setValue(this.user.role); }
          if (this.user.grade) { this.userForm.controls.grade.setValue(this.user.grade); }
        }, (err: HttpErrorResponse) => {
          console.error(err);
          this.notificationService.push(NotificationType.ERROR, err.message);
          this.router.navigate(['/']);
        });
    }, (err: HttpErrorResponse) => {
      console.error(err);
      this.notificationService.push(NotificationType.ERROR, err.message);
    });
  }

}
