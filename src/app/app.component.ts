import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  scrolled: boolean = false;
  constructor() {}

  gotoTop() {
    window.scrollTo(0, 0);
  }

  @HostListener('window:scroll')
  scrollWindow() {
    if (window.pageYOffset >= 1500 && !this.scrolled) {
      this.scrolled = true;
    } else if (window.pageYOffset < 1500 && this.scrolled) {
      this.scrolled = false;
    }
  } 
}
