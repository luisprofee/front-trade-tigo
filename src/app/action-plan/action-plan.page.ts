import { Component, OnInit } from '@angular/core';
import { ActionPlanModel } from '../models/action-plan.model';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

import { HttpService } from '../service/http.service';
import { NavController } from '@ionic/angular';
import { JwtService } from '../service/jwt.service';

@Component({
  selector: 'app-action-plan',
  templateUrl: './action-plan.page.html',
  styleUrls: ['./action-plan.page.scss'],
})
export class ActionPlanPage implements OnInit {

  plan: ActionPlanModel;
  private url = this.service.urlBase + 'nuevo_plan';

  constructor(  private service: HttpService,
                public navCtrl: NavController,
                private jwtService: JwtService ) { }

  ngOnInit() {
    this.plan = new ActionPlanModel();
  }

  savePlan(form: NgForm) {
    if( form.invalid ) { return; }
    console.log('formulario valido');
    console.log('datos a enviar ',this.plan);
    this.plan.state = 1;
    Swal.fire({
      icon: 'info',
      allowOutsideClick:false,
      text: 'espere por favor',
      
    });

    Swal.showLoading();
    this.service.post(`${this.url}`, this.plan)
      .subscribe( resp => {
        console.log(resp);
        
        Swal.close();
        Swal.fire({
          icon: 'success',
          title: 'Buen Trabajo...',
          text: 'Plan de acción guardado con exito!'
          
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
