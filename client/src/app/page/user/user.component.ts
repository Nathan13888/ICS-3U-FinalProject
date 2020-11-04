import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import {catchError} from 'rxjs/operators';
import { User, UserControllerService } from 'src/app/openapi';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user: User|undefined;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public userControllerService: UserControllerService) {    }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userControllerService.userControllerFindById(id)
      .subscribe(user => {
        this.user = user as User;
      }, err => {
        console.error(err);
      });
    } else {
      this.router.navigate(['/']);
    }
  }

}
