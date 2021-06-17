import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
export interface FilterListItem {
  value: unknown;
  column: string;
}
@Injectable({providedIn: 'root'})
export class FilterService {
  public currentValue$: Observable<unknown>;
  public valuesList$: Observable<FilterListItem[]>;
  public currentColumn$: Observable<string>;
  private currentValue: Subject<unknown> = new Subject();
  private valuesList: BehaviorSubject<FilterListItem[]> = new BehaviorSubject([] as FilterListItem[]);
  private currentColumn: BehaviorSubject<string> = new BehaviorSubject('');
  constructor() {
    this.valuesList$ = this.valuesList.asObservable();
    this.currentValue$ = this.currentValue.asObservable();
    this.currentColumn$ = this.currentColumn.asObservable();
  }

  public set newValue(val: unknown) {
    this.currentValue.next(val);
    const index = this.valuesList.value.findIndex(item => item.column === this.currentColumn.value);
    if (index === -1) {
      this.valuesList.next([...this.valuesList.value, {value: val, column: this.currentColumn.value}]);
    } else {
      const updatedValueList = [...this.valuesList.value];
      const updatedValue = {
        ...updatedValueList[index],
        value: val
      };
      updatedValueList[index] = updatedValue;
      this.valuesList.next(updatedValueList);
    }
  }

  public set newColumn(col: string) {
    this.currentColumn.next(col);
    const index = this.valuesList.value.findIndex(item => item.column === col);
    if (index === -1) {
      this.valuesList.next([...this.valuesList.value, {value: '', column: col}]);
    } else {
      const updatedValueList = [...this.valuesList.value];
      const updatedValue = {
        ...updatedValueList[index],
        column: col
      };
      updatedValueList[index] = updatedValue;
      this.valuesList.next(updatedValueList);
    }
  }

  public deleteListItem = (value: unknown, column: string): FilterListItem => {
    const updatedValuesList = this.valuesList.value.filter(item => item.column !== column && item.value !== value);
    this.valuesList.next(updatedValuesList);
    return {value, column} as FilterListItem;
  }

  public isValueInList = (value: unknown, column: string): boolean => (
    this.valuesList.value.findIndex(item => item.column === column && item.value === value) > -1
  )

  public resetValuesList() {
    this.valuesList.next([]);
  }
}
