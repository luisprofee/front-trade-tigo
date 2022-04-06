import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { HttpService } from '../service/http.service';
import { NavController } from '@ionic/angular';
import { JwtService } from '../service/jwt.service';
import { BudgetNationalModel } from '../models/budget-national.model';
import { RegionalBudgetModel } from '../models/regional-budget.model';
import { BudgetTerritoryModel } from '../models/territory-budget.model';

@Component({
  selector: 'app-allocate-territory-budget',
  templateUrl: './allocate-territory-budget.page.html',
  styleUrls: ['./allocate-territory-budget.page.scss'],
})
export class AllocateTerritoryBudgetPage implements OnInit {

  territory: BudgetTerritoryModel;
  private url = this.service.urlBase + 'allocate/territory';

  constructor(  private service: HttpService,
                public navCtrl: NavController,
                private jwtService: JwtService ) { }

  ngOnInit() {
    this.territory = new BudgetTerritoryModel();
  }

  saveBudgetTerritory( form: NgForm ) {
    if( form.invalid ) { return; }
    console.log('formulario valido');
    console.log('datos a enviar ',this.territory);

    Swal.fire({
      icon: 'info',
      allowOutsideClick:false,
      text: 'espere por favor',
      
    });

    Swal.showLoading();

    this.service.post(`${this.url}`, this.territory)
      .subscribe( resp => {
        console.log(resp);
        
        Swal.close();
        Swal.fire({
          icon: 'success',
          title: 'Buen Trabajo...',
          text: 'Presupuesto asignado con exito!'
          
        });

        
        
      }, ( err ) => {
        //console.log(err);
       
          Swal.fire({
            title:" Problemas para asignar presupuesto",
            text: "Por favor verificar y vulva a intentar",
            icon: "error",
            
          });
        
        Swal.close();
      })
    
  }

}
