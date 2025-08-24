import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Meal } from '../../modules/meal';
import { Drink } from '../../modules/drink';
import { MenuAdministrationService } from '../../services/menu-administration.service';
import { NewMeal } from '../../modules/new-meal';
import { NewDrink } from '../../modules/new-drink';
import { AdminLoginService } from '../../services/admin-login.service';
import { ProtectedData } from '../../modules/protected-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administration',
  imports: [CommonModule, FormsModule],
  templateUrl: './administration.component.html',
  styleUrl: './administration.component.scss'
})
export class AdministrationComponent {
// Properties
  pastas: Meal[] = [];
  pizzas: Meal[] = [];
  wraps: Meal[] = [];
  drinks: Drink[] = [];
  
  editMealId: number | null = null;

  newMeal: NewMeal = {
    meal_name: '',
    meal_type: '',
    ingredients: [],
    price: null
  }
  addMealForm: boolean = false;

  newDrink: NewDrink = {
    drink_name: '',
    price: null
  }
  addDrinkFrom: boolean = false;
  message: string = '';
  error: string = '';

  protectedData: ProtectedData = {
    user: { 
      id: null,
      username: '',
      iat: null,
      exp: null
    }
  };

  isVisable: string = 'none';
  showBtn: string = 'Visa Skyddade data';

  formatedIssuedTime: string = '';
  formatedExpiredTime: string = '';
  constructor(private menuService: MenuAdministrationService, private adminService: AdminLoginService, private router: Router) {}

  ngOnInit() {
    
    this.menuService.getPasta().subscribe((pastas) => {
      this.pastas = pastas;
      pastas.sort((a, b) =>
        (a.id > b.id) ? 1: -1
      );
    });

    this.menuService.getPizza().subscribe((pizzas) => {
      this.pizzas = pizzas;
      pizzas.sort((a, b) =>
        (a.id > b.id) ? 1: -1
      );
    });
    
    this.menuService.getWrap().subscribe((wraps) => {
      this.wraps = wraps;
      wraps.sort((a, b) =>
        (a.id > b.id) ? 1: -1
      );
    });
    
    this.menuService.getDrinks().subscribe((drinks) => {
      this.drinks = drinks;
      drinks.sort((a, b) =>
        (a.id > b.id) ? 1: -1
      );
    });

    this.adminService.getProtectedData().subscribe({
      next: response => {
        this.protectedData.user = response.user;
        if (this.protectedData.user.iat !== null && this.protectedData.user.exp !== null) {
          let iatDate = new Date(this.protectedData.user.iat * 1000);
          this.formatedIssuedTime = iatDate.toLocaleTimeString('sv-SE', {
            hour: '2-digit',
            minute: '2-digit'
          });
          let expDate = new Date(this.protectedData.user.exp * 1000);

          this.formatedExpiredTime = expDate.toLocaleTimeString('sv-SE', {
            hour: '2-digit',
            minute: '2-digit'
          });
        }
      },
      error: err => {
        this.error = err.error.message;
      }
    });
  }

  addNewMeal(meal: NewMeal) {

    this.menuService.addMeal(meal).subscribe({
      next: response => {
        console.log(response);
        this.message = `Maträtt ${meal.meal_name} är tillagd!`
        this.error = '';
        this.addMealForm = false;
        alert(this.message);
        // Ladda om sidan
        window.location.reload();
      },
      error: err => {
        console.error(err.error.message);
        this.error = err.error.message;
        this.message = '';
      }
    });
  }

  updateMeal(meal: Meal) {
    this.menuService.updateMeal(meal.id, meal).subscribe({
      next: () => {
        this.editMealId = null;
      },
      error: err => {
        console.error('Ett fel har inträffat: ' + err);
      }
    });
  }

  deleteMeal(id: number) {
    this.menuService.deleteMeal(id).subscribe({
      next: () => {
        alert('Maträtten har tagits bort');
        window.location.reload();
      }, 
      error: err => {
        console.error('Ett fel har inträffat', err);
      }
    });
  }

  addNewDrink(drink: NewDrink) {
    this.menuService.addDrink(drink).subscribe({
      next: response => {
        console.log(response);
        this.message = `Dryck: ${drink.drink_name} är tillagd!`
        this.error = '';
        this.addDrinkFrom = false;
        alert(this.message);
        // Ladda om sidan
        window.location.reload();
      },
      error: err => {
        console.error(err.error.message);
        this.error = err.error.message;
        this.message = '';
      }
    });
  }

  updateDrink(drink: Drink) {
    this.menuService.updateDrink(drink.id, drink).subscribe({
      next: () => {
        this.editMealId = null;
      },
      error: err => {
        console.error('Ett fel har inträffat: ' + err);
      }
    });
  }

  deleteDrink(id: number) {
    this.menuService.deleteDrink(id).subscribe({
      next: () => {
        alert('Dryck har tagits bort');
        window.location.reload();
      }, 
      error: err => {
        console.error('Ett fel har inträffat', err);
      }
    });
  }

  // För att kunna försätta skriva utan att skriv-markör försvinna
  trackByIndex(index: number, item: any) {
    return index;
  }

  // Hämta skyddade data
  getProtectedData() {
    
        if(this.isVisable === 'none'){
          this.isVisable = 'block';
          this.showBtn = 'Dölj Skyddade data'
        } else {
          this.isVisable = 'none';
          this.showBtn = 'Visa Skyddade data';
        }
  }
  // Logga ut
  logOut() {
    localStorage.removeItem('authtoken');
    this.router.navigate(['/admin-inlog']);
  }

}
