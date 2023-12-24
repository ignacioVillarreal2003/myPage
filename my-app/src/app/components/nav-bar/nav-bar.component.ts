import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  openMenu() {
    const body = document.querySelector('body') as HTMLElement;
    const hamburgerCheckbox = document.querySelector('.hamburger input') as HTMLInputElement;
    const menu = document.querySelector('.hamburger-active') as HTMLElement;
    if (hamburgerCheckbox.checked) {
      menu.classList.add('activeHamburger');
      body.classList.add('noScroll');
    } else {
      menu.classList.remove('activeHamburger');
      body.classList.remove('noScroll');
    }
  }

  closeBar() {
    const body = document.querySelector('body') as HTMLElement;
    const hamburgerCheckbox = document.querySelector('.hamburger input') as HTMLInputElement;
    const menu = document.querySelector('.hamburger-active') as HTMLElement;
    hamburgerCheckbox.checked = false;
    menu.classList.remove('activeHamburger');
    body.classList.remove('noScroll');
    console.log(hamburgerCheckbox.checked);
    
  }


}
