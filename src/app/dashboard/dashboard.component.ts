import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserUtilitiesService } from '../user-utilities.service';
import { tap, finalize, catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  autoCompleteControl$ = new FormControl();
  // destroyAllSubscription$ = new Subject();
  isLoading = false;
  errorMessage: string;
  options$: Observable<string[]> = this.autoCompleteControl$.valueChanges
    .pipe(
      // * takeUntil is not necessary because of async
      // takeUntil(this.destroyAllSubscription$),
      tap(() => this.errorMessage = ''),
      debounceTime(600),
      distinctUntilChanged(),
      switchMap(term => this.userUtilityService.searchEntries(term)
        .pipe(
          tap(() => this.isLoading = true),
           // TODO R&D
          // ? takeUntil is not necessary since the outer observable is already cleared
          // takeUntil(this.destroyAllSubscription$),
          catchError(e => {
            this.errorMessage = e;
            return of([]);
          }),
          finalize(() => {
            this.isLoading = false;
          }),
        )
      )
    ) as Observable<string[]>;

  constructor(private userUtilityService: UserUtilitiesService) {
  }

  ngOnInit() {
  }

  /* //* removing ngOnDestroy since async handles memory leaks
  ngOnDestroy(): void {
    this.destroyAllSubscription$.next(true);
    this.destroyAllSubscription$.unsubscribe();
  } */

}
