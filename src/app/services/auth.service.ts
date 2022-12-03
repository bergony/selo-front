import { Injectable, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { delay, filter, map, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnChanges {
  public isAuthenticated$: Observable<boolean>;
  public isAuthenticatedWithDelay$: Observable<boolean>;
  private redirect = false;
  private token = '';

  constructor(private router: Router, private route: ActivatedRoute) {
    this.isAuthenticated$ = of(this.token != '');
    this.isAuthenticatedWithDelay$ = this.isAuthenticated$.pipe(delay(1000));
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        map((e) => this.route.firstChild),
        switchMap((route) => route?.data ?? of({}))
      )
      .subscribe((data) => {
        this.redirect = data['authOnly'] ?? false;
      });
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.isAuth();

    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        map((e) => this.route.firstChild),
        switchMap((route) => route?.data ?? of({}))
      )
      .subscribe((data) => {
        console.log(data);
        this.redirect = data['authOnly'] ?? false;
      });
  }

  public isAuth() {
    const token = sessionStorage.getItem('token');
    if (token != null) {
      this.token = token;
    } else {
      this.token = '';
    }
    this.isAuthenticated$ = of(this.token != '');
    this.isAuthenticatedWithDelay$ = this.isAuthenticated$.pipe(delay(1000));
  }

  public async createUser() {
    const token = sessionStorage.getItem('token');
    if (token != null) {
      this.token = token;
    } else {
      this.token = '';
    }
    this.isAuthenticated$ = of(this.token != '');
    console.log(token);
    await this.router.navigateByUrl('/');
  }

  public async logout($event?: Event) {
    sessionStorage.removeItem('token');
    this.isAuthenticated$ = of(false);

    if (this.redirect) {
      await this.router.navigateByUrl('/');
    }
  }
}
