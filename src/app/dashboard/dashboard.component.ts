import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserUtilitiesService } from '../user-utilities.service';
import { takeUntil, finalize, catchError } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit, OnDestroy {
  autoCompleteControl$ = new FormControl();
  options: string[] = [];
  destroyAllSubscription = new Subject();
  isLoading = false;
  errorMessage: string;

  constructor(private userUtilityService: UserUtilitiesService) {
  }

  ngOnInit() {
    this.userUtilityService.getUserNames(this.autoCompleteControl$.valueChanges)
      .pipe(
        takeUntil(this.destroyAllSubscription),
        catchError(e => this.errorMessage = e),
        finalize(() => {
          this.options = [];
          this.isLoading = false;
        }),
      )
      .subscribe((result: string[]) => {
        this.options = result;
      });
  }

  ngOnDestroy(): void {
    this.destroyAllSubscription.next(true);
    this.destroyAllSubscription.complete();
  }

}
