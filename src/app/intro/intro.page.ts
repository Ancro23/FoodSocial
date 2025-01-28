import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; //importamos el router
import { Storage } from '@ionic/storage-angular';//importamos storage
@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  standalone: false,
})
export class IntroPage implements OnInit {

  constructor(
    private router: Router,//inyectamos el router
    private storage: Storage//  inyectamos el storage
  ) { }


  ngOnInit() {
  }


finish(){
  console.log('finish');
this.storage.set('viLaIntro', true); // GUARDAMOS EN EL STORAGE QUE YA SE HA MOSTRADO LA INTRODUCCIÓN
this.router.navigateByUrl('/login');//redireccionamos a la pagina

}
}
