import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UserControllerService } from 'src/app/openapi';

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

  queries: Array<User>;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public userControllerService: UserControllerService) {
      this.queries = [];
    }

  ngOnInit(): void {
    console.log(this.queries);
    this.route.queryParams.subscribe(params => {
      this.queries = [];
      if (params.firstName) { this.searchForm.controls.firstName.setValue(params.firstName); }
      if (params.lastName) { this.searchForm.controls.lastName.setValue(params.lastName); }
      if (params.email) { this.searchForm.controls.email.setValue(params.email); }
      if (params.role) { this.searchForm.controls.role.setValue(params.role); }
      if (params.grade) { this.searchForm.controls.grade.setValue(params.grade); }

      console.log(params);
      console.log('params');
      this.userControllerService.userControllerSearch({
        where: {}
      }).subscribe(queries => {
        this.queries = queries;
        console.log(queries);
        console.log('queries');
      });
    });
  }

  search(): void {
    console.log(this.searchForm.value);
    console.log('search');
    this.router.navigate(['/'], {
      queryParams: {
        firstName: this.searchForm.controls.firstName.value,
        lastName: this.searchForm.controls.lastName.value,
        email: this.searchForm.controls.email.value,
        role: this.searchForm.controls.role.value,
        grade: this.searchForm.controls.grade.value,
      }
    });
  }

}
