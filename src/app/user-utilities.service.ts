import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserUtilitiesService {

  constructor() { }

  getUserNames(terms: Observable<string>) {
    return terms.pipe(
      filter(term => term.toLowerCase() !== ''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(term => this.searchEntries(term))
    );
  }

  searchEntries(term) {
    return of([term, 'a', 'b']);
    /* return this.http
        .get(this.baseUrl + this.queryUrl + term)
        .map(res => res.json()); */
  }
}
