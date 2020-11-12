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
  showAll = false;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public userControllerService: UserControllerService) {
    }

  ngOnInit(): void {
    // this.searchForm.controls.showAll.setValue(0);
    // TODO: update search fields when loading page
    this.updateSearch();
  }

  updateSearch(): void {
    this.route.queryParams.pipe(first()).subscribe(params => {
      if (params.firstName) {
        this.searchForm.controls.firstName.setValue(params.firstName);
      }
      if (params.lastName) {
        this.searchForm.controls.lastName.setValue(params.lastName);
      }
      if (params.email) {
        this.searchForm.controls.email.setValue(params.email);
      }
      if (params.role) {
        this.searchForm.controls.role.setValue(params.role);
      }
      if (params.grade) {
        this.searchForm.controls.grade.setValue(params.grade);
      }

      this.updateQueries();
    });
  }

  clear(): void {
    this.searchForm.controls.firstName.setValue('');
    this.searchForm.controls.lastName.setValue('');
    this.searchForm.controls.email.setValue('');
    this.searchForm.controls.role.setValue('');
    this.searchForm.controls.grade.setValue('');
  }

  toggleShowAll(): void {
    this.showAll = !this.showAll;
    this.updateQueries();
  }

  updateQueries(): void {
    // TODO: all params force string
    // TODO: filter input

    const control = this.searchForm.controls;

    const fn = control.firstName.value.trim();
    const ln = control.lastName.value.trim();
    const em = control.email.value.trim();
    const ro = control.role.value;
    const gr = control.grade.value;

    // TODO: show everything toggle (set filter empty)

    const filter = {
      where: (this.showAll ? {} : {
        firstName: { regexp: `/${fn}/i`},
        lastName: { regexp: `/${ln}/i` },
        email: { regexp: `/${em}/i` },
        role: { regexp: ro },
        grade: (gr === '' ? { gt: 0 } : Number(gr))
      }),
    };

    this.userControllerService.userControllerSearch(
      JSON.stringify(filter) as UserFilter
    ).pipe(first()).subscribe(queries => {
      this.queries = queries;
    });
  }

  search(): void {
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
