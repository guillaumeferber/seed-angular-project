import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SessionStorageService {
    public getItem = (key: string): unknown | unknown[] => JSON.parse(sessionStorage.getItem(key));

    public setItem = (key: string, value: unknown | unknown[]): void => sessionStorage.setItem(key, JSON.stringify(value));

    public delete = (key: string): void => sessionStorage.removeItem(key);

    public clear = () => sessionStorage.clear();
}
