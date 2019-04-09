import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, filter, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserUtilitiesService {

  constructor() { }

  searchEntries(term: string): Observable<string[]> {
    return of(term === '' ? [] : [term, 'What goes around comes around', 'I\'mpossible'])
      .pipe(delay(2000));
  }

  getNames(params: any) {
    const { companyId } = params;
    return of([companyId, 'Merrick', 'Rick']);
  }
}
