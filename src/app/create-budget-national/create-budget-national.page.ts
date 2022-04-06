import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

import { HttpService } from '../service/http.service';
import { NavController } from '@ionic/angular';
import { JwtService } from '../service/jwt.service';
import { BudgetNationalModel } from '../models/budget-national.model';

@Component({
  selector: 'app-create-budget-national',
  templateUrl: './create-budget-national.page.html',
  styleUrls: ['./create-budget-national.page.scss'],
})
export class CreateBudgetNationalPage implements OnInit {

  budget: BudgetNationalModel;
  types = [];
  planes = [];
  private url = this.service.urlBase + 'create/budget';
  private urlCp = this.service.urlBase + 'type/budgets';
  private urlPa = this.service.urlBase + 'planes';

  constructor(  private service: HttpService,
                public navCtrl: NavController,
                private jwtService: JwtService ) { }

  ngOnInit() {
    this.budget = new BudgetNationalModel();
    this.getClassBudget();
    this.getPlanAction();
  }

  getClassBudget() {
    this.service.get(this.urlCp)
      .subscribe( resp => {
        console.log('clases PPTO ', resp);
        this.types = resp['types'];
      })
  }

  getPlanAction() {
    this.service.get(this.urlPa)
      .subscribe( resp => {
        console.log('planes ', resp);
        this.planes = resp['planes'];
      })
  }

  saveBudgetNational( form: NgForm ) {
    if( form.invalid ) { return; }
    console.log('formulario valido');
    console.log('datos a enviar ',this.budget);

    this.budget.state = 1;
    Swal.fire({
      icon: 'info',
      allowOutsideClick:false,
      text: 'espere por favor',
      
    });

    Swal.showLoading();
    this.service.post(`${this.url}`, this.budget)
      .subscribe( resp => {
        console.log(resp);
        
        Swal.close();
        Swal.fire({
          icon: 'success',
          title: 'Buen Trabajo...',
          text: 'Presupuesto guardado con exito!'
          
        });


        this.budget = new BudgetNationalModel();

        
        
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
