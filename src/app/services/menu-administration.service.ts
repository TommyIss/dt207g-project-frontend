import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Meal } from '../modules/meal';
import { Observable } from 'rxjs';
import { Drink } from '../modules/drink';
import { NewMeal } from '../modules/new-meal';
import { NewDrink } from '../modules/new-drink';

@Injectable({
  providedIn: 'root'
})
export class MenuAdministrationService {
  // Properties
  url: string = 'https://tois-dt207g-project-webbservice.onrender.com/';

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

  // Lägga till ny maträtt
  addMeal(newMeal: NewMeal): Observable<NewMeal> {
    return this.http.post<NewMeal>(this.url + 'meals', newMeal, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
  // Uppdatera maträtt
  updateMeal(id: number, meal: Meal): Observable<Meal> {
    return this.http.put<Meal>(`${this.url}meals/${id}`, meal, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
  // Radera en maträtt
  deleteMeal(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}meals/${id}`);
  }

  // Lägga till ny dryck
  addDrink(newDrink: NewDrink): Observable<Drink> {
    return this.http.post<Drink>(this.url + 'drinks', newDrink, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
  // Uppdatera dryck
  updateDrink(id: number, drink: Drink): Observable<Drink> {
    return this.http.put<Drink>(`${this.url}drinks/${id}`, drink, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
  // Radera en dryck
  deleteDrink(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}drinks/${id}`);
  }
}
