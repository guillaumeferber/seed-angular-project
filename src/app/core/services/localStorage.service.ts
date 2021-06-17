import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
    public getItem = (key: string): unknown | unknown[] => (localStorage.getItem(key) && JSON.parse(localStorage.getItem(key))) || null;

    public setItem = (key: string, value: unknown | unknown[]): void => localStorage.setItem(key, JSON.stringify(value));

    public delete = (key: string): void => localStorage.removeItem(key);

    public clear = () => localStorage.clear();
}
