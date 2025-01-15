import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle'; //importamos el register de swiper

register(); //registramos el swiper
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor() {}
}
