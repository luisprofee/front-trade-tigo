import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonContent, ToastController } from '@ionic/angular';
import { HttpService } from '../service/http.service';
import { NavController } from '@ionic/angular';
import { JwtService } from '../service/jwt.service';
import { NavigationExtras } from '@angular/router';
import { VerticalModel } from '../models/verticals.model';

@Component({
  selector: 'app-automatic-budget',
  templateUrl: './automatic-budget.page.html',
  styleUrls: ['./automatic-budget.page.scss'],
})
export class AutomaticBudgetPage implements OnInit {

  budgets = [];
  verticals = [];
  indexVerticalSelected: number = null;
  indexChannelSelected: number = null;
  indexRegionalSelected: number = null;
  vertical: VerticalModel;
  option = {
    budget_id: 0,
    edit_vertical: 0,
    edit_channel: 0,
    edit_regional: 0
  }

  valueItems = {
    vertical_id: null,
    vertical_value: null,
    channel_id: null,
    channel_value:null
  }

  pesosAcumulado = {
    vertical:null,
    channel:null,
    regional:null
  }

  button = {
    vertical: 1,
    channel: 1,
    regional: 1
  }

  items = [];
  channels = [];
  budgetTemp = {
    acumulado: 0,
    vertical:0
  }

  private urlB = this.service.urlBase + 'budgets';
  private url = this.service.urlBase + 'weights/verticals/';
  private urlC = this.service.urlBase + 'weights/regionals/channels/';
  private urlChannel = this.service.urlBase + 'channel_verticals/';
  private urlUpdateVertical = this.service.urlBase + 'update_vertical/';
  private urlUpdateChannel = this.service.urlBase + 'update_channel/';
  private urlUpdateRegional = this.service.urlBase + 'update_regional/';

  constructor(  private service: HttpService,
    public navCtrl: NavController,
    private jwtService: JwtService,
    private toastController: ToastController
     ) { }


  formatterPeso = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  minimumFractionDigits: 0
  })

  ngOnInit() {
    this.getBudgets();
    this.vertical = new VerticalModel();
  }

  getBudgets() {
    this.service.get(this.urlB)
      .subscribe( resp => {
        console.log('PPTOS ', resp);
        this.budgets = resp['budgets'];
      })
  }

  async presentToast( message ) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'middle'
    });
    toast.present();
  }

  automatic( ) {
    this.service.get(this.url+this.option.budget_id)
      .subscribe( resp => {
        console.log(resp);
        this.items = [];
        this.verticals = resp['verticales'];
        console.log(this.items);
        this.pesosAcumulado.vertical = resp['pesosVerticals'];
        
      }, (error) => {
        console.log('hubo un error ', error);
        
      })
  }

  getBudgetChannelRegional(id, value) {
    this.valueItems.vertical_id = id;
    this.valueItems.vertical_value = value;
    this.service.get(this.urlChannel+id+'/'+value)
      .subscribe(resp => {
        this.channels = resp['channelsVerticals'];
        this.pesosAcumulado.channel = resp['pesoChannel'];
        console.log('consulta vertical regional y canal ',resp);
        
      }, (error) => {
        console.log('hubo un error ', error);
        
      })
  }

  getChannelReactive() {
    this.service.get(this.urlChannel+this.valueItems.vertical_id+'/'+this.valueItems.vertical_value)
      .subscribe(resp => {
        this.channels = resp['channelsVerticals'];
        this.pesosAcumulado.channel = resp['pesoChannel'];
        //console.log('consulta vertical regional y canal ',resp);
        
      }, (error) => {
        console.log('hubo un error ', error);
        
      })
  }

  getBudgetRegional(id, value) {
    this.budgetTemp.vertical = value;
    this.valueItems.channel_id = id;
    this.valueItems.channel_value = value;
    this.service.get(this.urlC+id+'/'+value)
      .subscribe(resp => {
        this.items = resp['dealer'];
        this.budgetTemp.acumulado = resp['acumulado'];
        console.log('consulta vertical regional y canal ',resp);
        
      }, (error) => {
        console.log('hubo un error ', error);
        
      })
  }

  getregionalReactive() {
    this.service.get(this.urlC+this.valueItems.channel_id+'/'+this.valueItems.channel_value)
    .subscribe(resp => {
      this.items = resp['dealer'];
      this.budgetTemp.acumulado = resp['acumulado'];
      this.pesosAcumulado.regional = resp['pesoRegional'];
      console.log('consulta vertical regional y canal ',resp);
      
    }, (error) => {
      console.log('hubo un error ', error);
      
    })
  }

  updateVertical(id, name, weight) {
    this.indexVerticalSelected = this.verticals.findIndex(vertical => vertical.id == id);
    this.option.edit_vertical = 1;
  }

  updateChanel(id) {
    this.indexChannelSelected = this.channels.findIndex(channel => channel.id == id);
    this.option.edit_channel = 1;
  }

  updateRegional(id) {
    this.indexRegionalSelected = this.items.findIndex(regional => regional.id == id);
    this.option.edit_regional = 1;
  }

  validationRegional(event) {
    var sum = this.items.reduce((acumulador, valorAcutual) => acumulador + valorAcutual.peso,0);
    console.log(this.items, sum);
    if (sum <= 100) this.button.regional = 1;
    else{
      this.presentToast('El peso ingresado supera el 100%');
      this.button.regional = 0;
    }
    
  }

  validationChannel(event) {
    var sum = this.channels.reduce((acumulador, valorActual) => acumulador+valorActual.peso,0);
    console.log(this.channels, sum);
    if (sum <= 100) this.button.channel = 1;
    else{
      this.presentToast('El peso ingresado supera el 100%');
      this.button.channel = 0;
    }
    
  }

  validationVertical( event ) {
    var sum = this.verticals.reduce((acumulador, valorActual) => acumulador+valorActual.weight,0);
    console.log(this.verticals, sum)
    console.log('enviar: ', this.verticals[this.indexVerticalSelected]);
    
    if (sum <= 100) this.button.vertical = 1;
    else{
      this.presentToast('El peso ingresado supera el 100%');
      this.button.vertical = 0;
    }
  }

  cancel( option) {
    if (option === 1) this.option.edit_vertical = 0;
    if (option === 2) this.option.edit_channel = 0;
    if (option === 3) this.option.edit_regional = 0;
    
  }



  saveUpdateVertical( form: NgForm ) {
    this.option.edit_vertical = 0;
    console.log(this.verticals, this.indexVerticalSelected);
     
    this.service.get(this.urlUpdateVertical
      +this.verticals[this.indexVerticalSelected].id 
      +'/'+this.verticals[this.indexVerticalSelected].weight)
      .subscribe(resp => {
        console.log(resp);
        this.automatic();
        
      }, (error) => {
        console.log('hubo un error: ',error);
        
      })
  }

  saveUpdateChannel( form: NgForm ) {
    this.option.edit_channel = 0;
    //console.log(this.channels, this.indexVerticalSelected);
     
    this.service.get(this.urlUpdateChannel
      +this.channels[this.indexChannelSelected].id 
      +'/'+this.channels[this.indexChannelSelected].peso)
      .subscribe(resp => {
        console.log(resp);
        this.getChannelReactive();
        
      }, (error) => {
        console.log('hubo un error: ',error);
        
      })
  }

  saveUpdateRegional( form: NgForm ) {
    this.option.edit_regional = 0;
    //console.log(this.channels, this.indexVerticalSelected);
     
    this.service.get(this.urlUpdateRegional
      +this.items[this.indexRegionalSelected].id 
      +'/'+this.items[this.indexRegionalSelected].peso)
      .subscribe(resp => {
        console.log(resp);
        this.getregionalReactive();
        
      }, (error) => {
        console.log('hubo un error: ',error);
        
      })
  }


}
