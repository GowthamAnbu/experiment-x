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
      tap(() => this.isLoading = true),
      switchMap(term => this.userUtilityService.searchEntries(term)
        // * ERROR ISOLATION PART to prevent the outer streams from completion since errors always complete the stream !
        .pipe(
           // TODO R&D
          // ? takeUntil is not necessary since the outer observable is already cleared
          // takeUntil(this.destroyAllSubscription$),
          tap(() => { this.isLoading = false; }),
          catchError(e => {
            this.errorMessage = e;
            return of([]);
          }),
          /* // * finalize is called even when the switch map switches the inner observable
            when the source observable changes in which case the loader value set to true by the change
            in new source observable will set to false by the switch map (since unsubscribing the inner
            observable also calls the finalize method)
            */
          /* finalize(() => {
            this.isLoading = false;
          }), */
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
