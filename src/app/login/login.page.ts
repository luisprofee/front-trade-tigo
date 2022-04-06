import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

import { HttpService } from '../service/http.service';
import { NavController } from '@ionic/angular';
import { JwtService } from '../service/jwt.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario: UsuarioModel;
  private url = this.service.urlBase + 'auth/login';
  user: any = {};

  resul:any = [];
  hideInputPassword:boolean=true;

  constructor(private service: HttpService,
              public navCtrl: NavController,
              private jwtService: JwtService) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
  }

  getToken() {

  }

  login (form: NgForm) {
    if( form.invalid ) { return; }
    console.log('formulario valido');
    console.log(this.usuario);
    Swal.fire({
      icon: 'info',
      allowOutsideClick:false,
      text: 'espere por favor',
      
    });

    Swal.showLoading();
    this.service.post(`${this.url}`, this.usuario)
      .subscribe( resp => {

        
        this.resul = resp;
        console.log(resp);
        localStorage.setItem('token', this.resul.token);
        Swal.close();

        this.navCtrl.navigateForward(['create-budget-national']);

        //this.getToken();
        
      }, ( error ) => {
        //console.log('hay error', error.error.data);
        if (error.error.data == 'El email no existe' || error.error.data =='Credenciales incorrectas') {
          Swal.fire({
            title:" Credenciales incorrectas",
            text: "Por favor verificar y vulva a intentar",
            icon: "error",
            
          });
        }
        //Swal.close();
      })
  }

}
