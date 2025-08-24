export interface NewReservation {
    guest_name: string;
    phone: string; 
    email: string;
    guests_number: number | null; 
    reservation_date: string; 
    reservation_time: string; 
}
