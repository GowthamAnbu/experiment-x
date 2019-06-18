import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserUtilitiesService } from '../user-utilities.service';
import { tap, catchError, debounceTime, distinctUntilChanged, switchMap, takeUntil, skip, finalize } from 'rxjs/operators';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  autoCompleteControl$ = new FormControl();
  // // destroyAllSubscription$ = new Subject();
  isLoading = false;
  errorMessage: string;
  @ViewChild('auto') matAutoComplete: MatAutocomplete;
  workAround$ = new BehaviorSubject('');
  optionSelected$ = new Subject();
  options$: Observable<string[]>  = this.autoCompleteControl$.valueChanges
    .pipe(
      // * takeUntil is not necessary because of async
      // takeUntil(this.destroyAllSubscription$),
      tap(a => {
        this.errorMessage = '';
        this.workAround$.next(a);
      }),
      debounceTime(600),
      distinctUntilChanged(),
      tap(() => this.isLoading = true),
      switchMap(term => this.userUtilityService.searchEntries(term)
      // * ERROR ISOLATION PART to prevent the outer streams from completion since errors always complete the stream !
      .pipe(
        // * refer: https://blog.strongbrew.io/building-a-safe-autocomplete-operator-with-rxjs/
          // // * below takeUntil is wrong should fix this with subject or behaviorsubject
          // // * since option$ is observable it never emits a value until subscription
          //  // TODO R&D
          // // ? takeUntil is not necessary since the outer observable is already cleared
          // // /* not needed */ takeUntil(this.destroyAllSubscription$),
          takeUntil(this.workAround$.pipe(skip(1))),
          catchError(e => {
            this.errorMessage = e;
            return of([]);
          }),
          /* // * finalize is called even when the switch map switches(unsubscibes) the inner observable
            when the source observable changes in which case the loader value is set to false
          */
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

  ngAfterViewInit() {
  }

  /* // * removing ngOnDestroy since async handles memory leaks
  // ngOnDestroy(): void {
  //   this.destroyAllSubscription$.next(true);
  //   this.destroyAllSubscription$.unsubscribe();
  // } */

  optionSelected(event: MatAutocompleteSelectedEvent) {
    this.optionSelected$.next(event);
    console.log('event', event);
  }
}
