import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { User, UserControllerService, UserFilter } from 'src/app/openapi';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('', [Validators.email]),
    role: new FormControl(''),
    grade: new FormControl(''),
  });

  queries: Array<User> | undefined;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public userControllerService: UserControllerService) {
    }

  ngOnInit(): void {
    // console.log(this.queries);

    this.updateQueries();
  }

  updateQueries(): void {
    // TODO: all params force string
    this.route.queryParams.pipe(first()).subscribe(params => {
      let fn;
      let ln;
      let em;

      if (params.firstName.length > 0) {
        this.searchForm.controls.firstName.setValue(params.firstName);
        fn = params.firstName;
      }
      if (params.lastName.length > 0) {
        this.searchForm.controls.lastName.setValue(params.lastName);
        ln = params.lastName;
      }
      if (params.email.length > 0) {
        this.searchForm.controls.email.setValue(params.email);
        em = params.email;
      }
      if (params.role) {
        this.searchForm.controls.role.setValue(params.role);
      }
      if (params.grade) {
        this.searchForm.controls.grade.setValue(params.grade);
      }

      const filter = {
        where: {
          firstName: fn,
          lastName: ln,
          email: em,
        },
      };

      this.userControllerService.userControllerSearch(
        JSON.stringify(filter) as UserFilter
      ).pipe(first()).subscribe(queries => {
        this.queries = queries;
        console.log(queries);
        console.log('queries');
      });
    });
  }

  search(): void {
    console.log(this.searchForm.value);
    console.log('search');
    // TODO: only search when there is text in search box
    this.router.navigate(['/'], {
      queryParams: {
        firstName: this.searchForm.controls.firstName.value,
        lastName: this.searchForm.controls.lastName.value,
        email: this.searchForm.controls.email.value,
        role: this.searchForm.controls.role.value,
        grade: this.searchForm.controls.grade.value,
      }
    }).then(() => {
      this.updateQueries();
    });
  }

}
