import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserUtilitiesService {

  constructor() { }

  getUserNames(terms: Observable<string>): Observable<string[]> {
    return terms.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(term => this.searchEntries(term))
    );
  }

  searchEntries(term: string): Observable<string[]> {
    return term === '' ? of([]) : of([term, 'What goes around comes around', 'I\'mpossible']);
  }

  getNames(params: any) {
    const { companyId } = params;
    return of([companyId, 'Merrick', 'Rick']);
  }
}
