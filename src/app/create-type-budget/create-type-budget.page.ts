import { Component, OnInit } from '@angular/core';
import { TypeBudget } from '../models/type-budget.model';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

import { HttpService } from '../service/http.service';
import { NavController } from '@ionic/angular';
import { JwtService } from '../service/jwt.service';

@Component({
  selector: 'app-create-type-budget',
  templateUrl: './create-type-budget.page.html',
  styleUrls: ['./create-type-budget.page.scss'],
})
export class CreateTypeBudgetPage implements OnInit {

  type: TypeBudget;
  private url = this.service.urlBase + 'create/type/budget';

  constructor(  private service: HttpService,
                public navCtrl: NavController,
                private jwtService: JwtService ) { }

  ngOnInit() {
    this.type = new TypeBudget();
  }

  saveTypeBudget( form: NgForm ) {
    if( form.invalid ) { return; }
    console.log('formulario valido');
    console.log('datos a enviar ',this.type);

    this.type.state = 1;
    Swal.fire({
      icon: 'info',
      allowOutsideClick:false,
      text: 'espere por favor',
      
    });

    Swal.showLoading();
    this.service.post(`${this.url}`, this.type)
      .subscribe( resp => {
        console.log(resp);
        
        Swal.close();
        Swal.fire({
          icon: 'success',
          title: 'Buen Trabajo...',
          text: 'Tipo de presupuesto guardado con exito!'
          
        });

        
        
      }, ( err ) => {
        //console.log(err);
       
          Swal.fire({
            title:" Problemas para guardar el plan de acción",
            text: "Por favor verificar y vulva a intentar",
            icon: "error",
            
          });
        
        Swal.close();
      })

  }

}
