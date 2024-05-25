import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  private _data: BehaviorSubject<string> = new BehaviorSubject('');

  public get Message(): Observable<string>{
    return this._data.asObservable();
  }


  setMessage(message: string){
    this._data.next(message);
  }
}
