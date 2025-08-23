import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Meal } from '../modules/meal';
import { Drink } from '../modules/drink';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  // Properties
  url: string = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  // Metoder för att få olika maträtttyp
  getPasta(): Observable<Meal[]> {
    return this.http.get<Meal[]>(this.url + 'meals/type/pasta');
  }
  getPizza(): Observable<Meal[]> {
    return this.http.get<Meal[]>(this.url + 'meals/type/pizza');
  }
  getWrap(): Observable<Meal[]> {
    return this.http.get<Meal[]>(this.url + 'meals/type/wrap');
  }
  getDrinks(): Observable<Drink[]> {
    return this.http.get<Drink[]>(this.url + 'drinks');
  }
}
