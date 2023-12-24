import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  asunto = "";
  cuerpo = "";

  openMail() {
    const body = document.querySelector('body') as HTMLElement;
    const cuadroMail = document.querySelector('.mail') as HTMLElement;
    body.classList.add('noScroll');
    cuadroMail.classList.add('activeMail');
  }
  
  cancelMail(){
    const body = document.querySelector('body') as HTMLElement;
    const cuadroMail = document.querySelector('.mail') as HTMLElement; 
    body.classList.remove('noScroll');
    cuadroMail.classList.remove('activeMail');
  }

  sendEmail() {
    const to = 'ignaciovillarreal20031231@gmail.com';
    const subject = this.asunto;
    const body = this.cuerpo;

    const mailtoLink = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
  }

}
