import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  // Meny default-display
  menuDisplay: string = 'none';
  
  // Skärm är 800px eller mindre
  mediaQuery = window.matchMedia('(max-width: 800px)');
  
  // Funktion för menyen vid sidans start/omladdning
  init(): void {
    if(this.mediaQuery.matches) {
      this.menuDisplay = 'none';
    } else {
      this.menuDisplay = 'block';
    }
  }

  // Uppdatera menyn när skärmstorlek ändras
  updateMenuDisplay(isSmallScreen: boolean): void {
    let navMenuEl = document.getElementById('nav-menu') as HTMLDivElement;
    if(isSmallScreen) {
      this.menuDisplay = 'none';
      navMenuEl.style.display = 'none';
    } else {
      this.menuDisplay = 'block';
      navMenuEl.style.display = 'block';
    }
  }

  // Anrop för funktioner när sidans startas/omladdas
  ngOnInit(): void {
    this.init();

    this.updateMenuDisplay(this.mediaQuery.matches);
    this.mediaQuery.addEventListener('change', (event: MediaQueryListEvent) => { 
      this.updateMenuDisplay(event.matches);
    });

    
  }

  // Öppna/ stänga menu
  menuToggle(): void {
    let navMenuEl = document.getElementById('nav-menu') as HTMLDivElement;
    if(this.menuDisplay === 'none') {
      this.menuDisplay = 'block';
      navMenuEl.style.display = 'block';
    } else {
      this.menuDisplay = 'none';
      navMenuEl.style.display = 'none';
    }
  }
}
