import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from '../modules/reservation';
import { NewReservation } from '../modules/new-reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  // Properties
  url: string = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getReservation(id: number): Observable<Reservation> {
    return this.http.get<Reservation>(this.url + 'reservations/' + id);
  }

  addReservation(newReservation: NewReservation): Observable<NewReservation> {
    return this.http.post<NewReservation>(this.url + 'reservations', newReservation, {
      headers: new HttpHeaders ({
        'Content-Type': 'application/json'
      })
    });
  }

  updateReservation(id: number, reservation: Reservation):Observable<Reservation> {
    return this.http.put<Reservation>(`${this.url}reservations/${id}`, reservation, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  deleteReservation(id: number):Observable<void> {
    return this.http.delete<void>(`${this.url}reservations/${id}`);
  }
}
