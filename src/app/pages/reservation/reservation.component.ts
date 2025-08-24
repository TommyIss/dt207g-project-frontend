import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReservationService } from '../../services/reservation.service';
import { NewReservation } from '../../modules/new-reservation';

@Component({
  selector: 'app-reservation',
  imports: [CommonModule, FormsModule],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss'
})
export class ReservationComponent {

  newReservation: NewReservation = {
    guest_name: '',
    phone: '', 
    email: '',
    guests_number: null, 
    reservation_date: '', 
    reservation_time: '' 
  };

  error: string = '';
  
  confirmMessage: string = '';
  
  constructor(private reservationService: ReservationService) {}

  bookTable(reservation: NewReservation) {
    this.reservationService.addReservation(reservation).subscribe({
      next: response => {
        console.log(response);
        this.error = '';
        this.confirmMessage = 'Tack för din bokning! Du kommer att få ett bekrfätelse mejl så snart';
      },
      error: err => {
        console.error(err.error.message);
        this.error = err.error.message;
        this.confirmMessage = '';
      }
    });
  }
}
