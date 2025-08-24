import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
import { FormsModule } from '@angular/forms';
import { Reservation } from '../../modules/reservation';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-reservation',
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-reservation.component.html',
  styleUrl: './edit-reservation.component.scss'
})
export class EditReservationComponent {
  reservation: Reservation = {
    id: null,
    guest_name: '',
    phone: '', 
    email: '',
    guests_number: null, 
    reservation_date: '', 
    reservation_time: '' 
  };
  formatedDate: string = '';

  error: string = '';
  
  confirmMessage: string = '';
    
  constructor(private reservationService: ReservationService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
      this.reservation.id = Number(this.route.snapshot.paramMap.get('id'));

      this.reservationService.getReservation(this.reservation.id).subscribe(currentReservation => {
        this.reservation = currentReservation;
        this.formatedDate = this.reservation.reservation_date.split('T')[0];
        console.log(this.formatedDate);
      });
    }

    updateReservation(newReservation: Reservation) {
      if(newReservation.id !== null) {
        this.reservationService.updateReservation(newReservation.id, newReservation).subscribe({
          next: response => {
            console.log(response);
            this.confirmMessage = 'Tack för din bokning! Du kommer att få ett bekrfätelse mejl så snart';
            alert(this.confirmMessage);
            this.router.navigate(['/']);
          },
          error: err => {
            console.error(err.error.message);
            this.error = err.error.message;
            this.confirmMessage = '';
          }
        });
      }
    }

    cancelReservation(id: number | null) {
      if(id !== null) {
        this.reservationService.deleteReservation(id).subscribe({
        next: () => {
          this.confirmMessage = 'Du har avbokat din reservation! Du kommer att få ett bekrfätelse mejl så snart';
            alert(this.confirmMessage);
            this.router.navigate(['/']);
        },error: err => {
          console.error(err.error.message);
          this.error = err.error.message;
          this.confirmMessage = '';
        }
      });
      }
      
    }
}
