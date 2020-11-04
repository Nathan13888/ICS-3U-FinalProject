import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../search/search.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user: User|undefined;

  constructor(
    public route: ActivatedRoute,
    public router: Router) {    }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id === '007') {
      this.user = {
        id: '007',
        role: 'student',
        name: 'Justin',
        grade: 11,
        email: 'justin@email.com'
      };
    }
    else { this.user = undefined; }
  }

}
