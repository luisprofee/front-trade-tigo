import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpService } from '../service/http.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { RegionalBudgetModel } from '../models/regional-budget.model';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-edit-budget-regional',
  templateUrl: './edit-budget-regional.page.html',
  styleUrls: ['./edit-budget-regional.page.scss'],
})
export class EditBudgetRegionalPage implements OnInit {

  budgetRegional: RegionalBudgetModel;
  
  nameRegional : string ;
  nameBudget : number;
  nameChannel : string;
  private url = this.service.urlBase + 'search_budget/';
  private urlB = this.service.urlBase + 'budgets';
  private urlR = this.service.urlBase + 'regionals';
  private urlC = this.service.urlBase + 'channels';
  private urlU = this.service.urlBase + 'update_budget/regional';
  budget_id;
  budgets = [];
  regionals = [];
  channels = [];

  constructor(private service: HttpService,
    private route: ActivatedRoute,
    private router: Router,
    public navCtrl:  NavController) { }

  ngOnInit() {
    this.getId();
    this.budgetRegional = new RegionalBudgetModel();
    this.getBudgets();
    this.getChannels();
    this.getRegionals();
    
  }

  

  getBudgets() {
    this.service.get(this.urlB)
      .subscribe( resp => {
        console.log('PPTOS ', resp);
        this.budgets = resp['budgets'];
      })
  }

  
  

  getRegionals() {
    this.service.get(this.urlR)
      .subscribe( resp => {
        console.log('regionales ', resp);
        this.regionals = resp['regionals'];
        
      })
  }

  getChannels() {
    this.service.get(this.urlC)
      .subscribe( resp => {
        console.log('channels ', resp);
        this.channels = resp['channels'];
      })
  }

  getBudgetRegional() {
    this.service.get(this.url+ this.budget_id)
      .subscribe( resp => {
        console.log('respuesta ',resp);
        this.budgetRegional.PPTO = resp['distribucion'][0]['PPTO'];
        this.budgetRegional.detail = resp['distribucion'][0]['detail'];
        this.budgetRegional.regional_id = resp['distribucion'][0]['regional']['id'];
        this.budgetRegional.budget_id = resp['distribucion'][0]['budget']['id'];
        this.budgetRegional.channel_id = resp['distribucion'][0]['channel']['id'];
        this.nameRegional = resp['distribucion'][0]['regional']['name'];
        this.nameChannel = resp['distribucion'][0]['channel']['name'];
        this.nameBudget = resp['distribucion'][0]['budget']['value'];
        console.log('prueba ', this.budgetRegional);
        console.log('rrrrr ', this.nameRegional);
        
      }, (error) => {
        console.log('hubo un error', error);
        
      })
  }

  formatterPeso = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  })

  getId() {
    this.route.queryParams.subscribe(params => {
      try{
        this.budget_id = JSON.parse(params['budget_id']);
        console.log(this.budget_id);
        this.getBudgetRegional();
      }catch(ex){
        console.log(ex);
      }
    });

  }


  updateBudgetRegional( form: NgForm ) {
    if( form.invalid ) { return; }
    console.log('formulario valido');
    this.budgetRegional.id = this.budget_id;
    this.service.post(this.urlU, this.budgetRegional)
      .subscribe( resp => {
        console.log('respuesta ', resp);
        Swal.fire({
          title: 'Desea guardar los cambios?',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: `Si`,
          denyButtonText: `Volver a Validar`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.navCtrl.navigateForward(['allocate-regional-budget']);
          } else if (result.isDenied) {
            Swal.fire('Cambios cancelados.!', '', 'info')
          }
        })
      }, (error) => {
        console.log('hubo un error');
        
      })
  }

}
