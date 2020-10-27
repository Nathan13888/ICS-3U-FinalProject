import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  displayNavBurger = false;

  constructor(
      private router: Router
  ) { }

  ngOnInit(): void {
      this.displayNavBurger = false;
  }

  toggleNavBurger(): void {
      this.displayNavBurger = !this.displayNavBurger;
  }

  navItemSelected(event: MouseEvent): void {
      this.displayNavBurger = false;
  }

}
