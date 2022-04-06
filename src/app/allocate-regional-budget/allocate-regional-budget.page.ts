import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, ToastController } from '@ionic/angular';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { HttpService } from '../service/http.service';
import { NavController } from '@ionic/angular';
import { JwtService } from '../service/jwt.service';
import { NavigationExtras } from '@angular/router';
import { RegionalBudgetModel } from '../models/regional-budget.model';


@Component({
  selector: 'app-allocate-regional-budget',
  templateUrl: './allocate-regional-budget.page.html',
  styleUrls: ['./allocate-regional-budget.page.scss'],
})
export class AllocateRegionalBudgetPage implements OnInit {

  @ViewChild ( IonContent, { static:true } )

  content: IonContent;
  nameRegional : string ;
  nameBudget : number;
  nameChannel : string;
  budgetRegional: RegionalBudgetModel;
  budgets = [];
  regionals = [];
  channels = [];
  file = new FormData();

  option = {
    state: 0,
    edit: false
  }

  presu;

 datos = {
  p: '',
  r: '',
  c: ''
 }

 information = {
   budget: 0,
   ejecution: 0
 }

  items = [];
  
  private url = this.service.urlBase + 'allocate/regional';
  private urlB = this.service.urlBase + 'budgets';
  private urlR = this.service.urlBase + 'regionals';
  private urlC = this.service.urlBase + 'channels';
  private urlD = this.service.urlBase + 'regionals_channels/';
  private urlS = this.service.urlBase + 'search_budget/';
  private urlU = this.service.urlBase + 'update_budget/regional';


  constructor(  private service: HttpService,
                public navCtrl: NavController,
                private jwtService: JwtService,
                private toastController: ToastController
                 ) { }

  ngOnInit() {
    this.budgetRegional = new RegionalBudgetModel();
    this.getBudgets();
    this.getChannels();
    this.getRegionals();
  }

  ionViewWillEnter() {
    //this.getDatos();
	}

  async presentToast( message ) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'middle'
    });
    toast.present();
  }

  getBudgetRegional(id) {
    this.service.get(this.urlS+ id)
      .subscribe( resp => {
        console.log('nueva forma ',resp);
        this.budgetRegional.PPTO = resp['distribucion'][0]['PPTO'];
        this.budgetRegional.detail = resp['distribucion'][0]['detail'];
        this.budgetRegional.regional_id = resp['distribucion'][0]['regional']['id'];
        this.budgetRegional.budget_id = resp['distribucion'][0]['budget']['id'];
        this.budgetRegional.channel_id = resp['distribucion'][0]['channel']['id'];
        this.nameRegional = resp['distribucion'][0]['regional']['name'];
        this.nameChannel = resp['distribucion'][0]['channel']['name'];
        this.nameBudget = resp['distribucion'][0]['budget']['value'];
        
        
      }, (error) => {
        console.log('hubo un error', error);
        
      })
  }

  updateBudgetRegional() {
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `Save`,
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success')
        this.saveModification();
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

  cancel(){
    //this.information.budget=0;
    this.option.state = 0;
    this.presentToast('Modificación Cancelada Correctamente.!');
    //this.budgetRegional.channel_id = 0;
    //this.budgetRegional.PPTO= 0;
    //this.budgetRegional.regional_id= 0;
    //this.getDatos();

  }

  saveModification( ) {
    this.service.post(this.urlU, this.budgetRegional)
      .subscribe( resp => {
        console.log('respuesta ', resp);
        this.getDatos();
        this.presentToast('Modificación realizada Correctamente.!');
        this.budgetRegional = new RegionalBudgetModel();
      }, (error) => {
        console.log('hubo un error');
        this.presentToast('Error al tratar de modificar.!');
        
      })
  }


  onFileSelected(event) {
    let form = event.target.files[0];
    this.file.append('excel',form);
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

  formatterPeso = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  })


  validarBudget( event ) {
    console.log('escribiendo ', event.target.value);

    if ( event.target.value > this.information.budget - this.information.ejecution) {
      this.presentToast('Esta cantidad supera el presupuesto.!');
      this.option.state = 2;
    }else{
      if (this.option.edit == true) {
        this.option.state = 1;
      }else{
        this.option.state = 0;
      }
      
    }
    
  }

  


  getDatos() {
    this.service.post(this.urlD, this.datos)
    .subscribe( resp => {
      this.items = resp['distribucion'];
      console.log('data', this.items);
      console.log('data', resp);
      this.information.ejecution = resp['accumulated'];
      this.information.budget = resp['budget']['value'];
    }, (error) => {
      console.log('hubo un error', error);
      
    })
  }

  scrollToTop( id ) {
    console.log('antes ', this.option.state);
    this.option.state = 1;
    console.log('despues ', this.option.state);
    this.option.edit = true;
    this.content.scrollToTop(3000);
    this.budgetRegional.id = id;
    this.getBudgetRegional(id);
  }

  updateBudget( id ) {
    console.log(id);
    let navigationExtras: NavigationExtras = {
      queryParams: {
        budget_id: JSON.stringify(id)
      }
    };
    this.navCtrl.navigateForward(['/edit-budget-regional'], navigationExtras);

  }
  getOption(event, op) {

    if (op == 1) this.datos.p = event.target.value;
    if (op == 2) this.datos.r = event.target.value;
    if (op == 3) this.datos.c = event.target.value;
    this.getDatos();
    console.log('hola', event.target.value);
    
  }



  saveBudgetRegional( form: NgForm ) {
    if( form.invalid ) { return; }
    console.log('formulario valido');
    console.log('datos a enviar ',this.budgetRegional);

    

    this.service.post(`${this.url}`, this.budgetRegional)
      .subscribe( resp => {
        console.log(resp);
        //this.budgetRegional.channel_id = 0;
        if (resp == 'ok') {
          this.presentToast('Ya existe un Presupuesto para esta regional y Canal');
        }else{
          this.budgetRegional.PPTO = 0;
          this.getDatos();
          this.presentToast('Presupuesdo Guardado Correctamente');
        }
        
      }, ( err ) => {
          this.presentToast('Error al guardar Presupuesto por favor intente más tarde');
      })


  }

}
