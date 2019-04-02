import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserUtilitiesService } from '../user-utilities.service';
import { takeUntil, finalize, catchError } from 'rxjs/operators';
import { Subject, Observable, observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  autoCompleteControl$ = new FormControl();
  options$: Observable<string[]>;
  // destroyAllSubscription = new Subject();
  isLoading = false;
  errorMessage: string;

  constructor(private userUtilityService: UserUtilitiesService) {
  }

  ngOnInit() {
    this.options$ = this.userUtilityService.getUserNames(this.autoCompleteControl$.valueChanges)
      .pipe(
        // takeUntil(this.destroyAllSubscription),
        catchError(e => this.errorMessage = e),
        finalize(() => {
          this.isLoading = false;
        }),
      ) as Observable<string[]>;
  }

  /* //* removing ngOnDestroy since async handles memory leaks
  ngOnDestroy(): void {
    this.destroyAllSubscription.next(true);
    this.destroyAllSubscription.complete();
  } */

}
