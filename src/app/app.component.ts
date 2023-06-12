import { Component, OnInit } from '@angular/core';
import {
  NavigationStart,
  Event as NavigationEvent,
  Router,
  NavigationEnd,
} from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  showFooter = true;

  constructor(public router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEvent) => {
        switch (window.location.pathname) {
          case '/blog/not-found':
          case '/not-found':
            this.showFooter = false;
            break;
          default:
            this.showFooter = true;
        }
      });
  }
  ngOnInit(): void {}
}
