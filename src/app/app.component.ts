import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle'; //importamos el register de swiper
import { Storage } from '@ionic/storage-angular'; // importamos el storage
register(); //registramos el swiper
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(private storage: Storage)// inicializamos el storage
 {}
  async ngOnInit() { //AÑADIMOS EL MÉTODO ngOnIni

  await this.storage.create(); // creamos el storage
}

}


