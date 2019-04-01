import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserUtilitiesService } from '../user-utilities.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  autoCompleteControl$ = new FormControl();
  options: string[] = [];

  constructor(private userUtilityService: UserUtilitiesService) {
  }

  ngOnInit() {
    this.userUtilityService.getUserNames(this.autoCompleteControl$.valueChanges)
      .subscribe(result => {
        this.options = result;
      });
  }

}
