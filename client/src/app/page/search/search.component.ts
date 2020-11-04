import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchQuery = new FormControl('');

  queries: Array<User>;

  constructor(
    public route: ActivatedRoute,
    public router: Router) {
      this.queries = [];
    }

  ngOnInit(): void {
    // this.queries = [];
    this.route.queryParams.subscribe(params => {
      const searchText = params.search;
      console.log(searchText);
      if (!searchText) { this.queries = []; }
      else {
        this.searchQuery.setValue(searchText);
        this.queries = [
          {
            id: '007',
            role: 'student',
            name: 'Justin',
            grade: 11,
            email: 'justin@email.com'
          }
        ];
      }
    });
  }

  search(): void {
    this.router.navigate(['/'], {queryParams: {search: this.searchQuery.value}});
  }

}

export interface User {
  id: string;
  role: 'student'|'mentor'|'teacher';
  name: string;
  grade: 1|2|3|4|5|6|7|8|9|10|11|12;
  email: string;
}
