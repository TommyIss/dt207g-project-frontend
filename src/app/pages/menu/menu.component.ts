import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Meal } from '../../modules/meal';
import { Drink } from '../../modules/drink';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-menu',
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  // Properties
  pastas: Meal[] = [];
  pizzas: Meal[] = [];
  wraps: Meal[] = [];
  drinks: Drink[] = [];

  constructor(private menuService: MenuService) {}

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
  }
}
