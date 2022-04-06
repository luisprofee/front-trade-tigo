import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonContent, ToastController } from '@ionic/angular';
import { HttpService } from '../service/http.service';
import { NavController } from '@ionic/angular';
import { JwtService } from '../service/jwt.service';
import { NavigationExtras } from '@angular/router';
import { VerticalModel } from '../models/verticals.model';
@Component({
  selector: 'app-create-weight',
  templateUrl: './create-weight.page.html',
  styleUrls: ['./create-weight.page.scss'],
})
export class CreateWeightPage implements OnInit {

  private urlVerticals = this.service.urlBase + 'verticals';
  private urlVerticalsSave = this.service.urlBase + 'save/verticals';
  private urlVerticalUpdate = this.service.urlBase + 'update_vertical/';
  private urlChannels = this.service.urlBase + 'channnel_vertical/';
  private urlUpdateChannel = this.service.urlBase + 'update_channel/';
  private urlRegionals = this.service.urlBase + 'regional_channel/vertical/';
  private urlUpdateRegional = this.service.urlBase + 'update_regional/';

  vertical: VerticalModel;
  indexVerticalSelected: number = null;
  indexChannelSelected: number = null;
  indexRegionalSelected: number = null;
  verticals = [];
  channels = [];
  regionals = [];
  
  vertical_id;
  channel_id;

  acu_vertical;
  acu_channel;
  acu_regional;

  options = {
    vertical: false,
    channel: false,
    regional: false,
    Uvertical: false,
    Uchannel: false,
    dataChannel: false,
    Uregional: false,
    dataRegional: false
  }

  buttons = {
    vertical:true,
    canal:true,
    regional:true
  }

  constructor(  private service: HttpService,
    public navCtrl: NavController,
    private jwtService: JwtService,
    private toastController: ToastController
     ) { }

  ngOnInit() {
    this.vertical = new VerticalModel();
  }

  async presentToast( message ) {
    const toast = await this.toastController.create({
      message: message,
      duration: 5000,
      position: 'middle'
    });
    toast.present();
  }

  getVerticals() {
    this.service.get(this.urlVerticals)
      .subscribe( resp => {
        this.verticals = resp['verticales'];
        this.acu_vertical = resp['pesoTotal'];
        console.log('respuesta: ',resp);
        
      })
  }

  saveVertical( form: NgForm ) {
    if( form.invalid ) { return; }
    console.log('formulario valido: ', this.vertical);
    if (this.vertical.weight + this.acu_vertical > 100) this.presentToast('Esta cantidad supera el 100%')
    else{
      this.service.post(this.urlVerticalsSave, this.vertical)
        .subscribe( resp => {
          if (resp == 'existe') {
            this.presentToast('Esta vertical ya existe')
          }else{
            this.presentToast('Vertical creada con exito')
          }
        })
    }
  }

  getChannel(event) {
    this.vertical_id = event.target.value;
    this.options.dataChannel = true;
    this.service.get(this.urlChannels+this.vertical_id)
      .subscribe( resp => {
        this.channels = resp['channels'];
        console.log('channel: ', this.channels);
        
      }, (error) => {
        console.log('hubo un error: ', error);
        
      })
  }

  getChannelO() {
    this.options.dataChannel = true;
    this.service.get(this.urlChannels+this.vertical_id)
      .subscribe( resp => {
        this.channels = resp['channels'];
      }, (error) => {
        console.log('hubo un error: ', error);
        
      })
  }

  option(event) {
    var op = event.target.value;
    if (op == 1){
      this.getVerticals();
      this.options.vertical = true;
      this.options.channel = false;
      this.options.regional = false;
    }  
    if (op == 2){
      this.options.channel = true;
      this.options.regional = false;
      this.options.vertical = false;
      this.getVerticals();
    }  
    if (op == 3){
      this.options.regional = true;
      this.options.channel = false;
      this.options.vertical = false;
      this.getVerticals();
    } 

    console.log('llego: ',op);
    
  }

  selectedChannel(id) {
    this.indexChannelSelected = this.channels.findIndex(channel => channel.id == id);
    this.options.Uchannel = true;
  }
  validatePesoChannel() {
    var peso = this.channels.reduce((acumulador, valorActual) => acumulador+valorActual.weight, 0);
    if (peso <= 100) this.buttons.canal = true;
    else{
      this.presentToast('el peso ingresado supera el 100% establecido');
      this.buttons.canal = false;
    }

  }

  selectedVertical(id) {
    this.indexVerticalSelected = this.verticals.findIndex(vertical => vertical.id == id);
    this.options.Uvertical = true;

  }

  selectedRegional(id) {
    this.indexRegionalSelected = this.regionals.findIndex(regional => regional.id == id);
    this.options.Uregional = true;
  }

  validatePesoRegional() {
    var peso = this.regionals.reduce((acumulador, valorActual) => acumulador+valorActual.weight,0);
    if (peso <= 100) this.buttons.regional = true;
    else{
      this.presentToast('el peso ingresado supera el 100% establecido');
      this.buttons.regional = false;
    }
  }

  validatePesoVerticar() {
    var peso = this.verticals.reduce((acumulador, valorActual) => acumulador+valorActual.weight,0);
    if (peso <= 100) this.buttons.vertical = true;
    else{
      this.presentToast('el peso ingresado supera el 100% establecido');
      this.buttons.vertical = false;
    }
  }



  updateVertical() {
    this.service.get(this.urlVerticalUpdate
    +this.verticals[this.indexVerticalSelected].id
    +'/'+this.verticals[this.indexVerticalSelected].weight)
      .subscribe( resp => {
        this.presentToast('El Peso de la Vertical seleccionada fue Modificado.!')
        this.options.Uvertical = false;
        this.getVerticals();
      },(error) => {
        console.log('hubo un error: ', error);
        
      })
  }

  updateChannel() {
    this.service.get(this.urlUpdateChannel
      +this.channels[this.indexChannelSelected].id
      +'/'+this.channels[this.indexChannelSelected].weight)
      .subscribe( resp => {
        this.presentToast('El Peso del Canal seleccionada fue Modificado.!');
        this.options.Uchannel = false;
        this.getChannelO();
      }, (error) => {
        console.log('hubo un error: ', error);
        
      })

  }


  selectVertical(event) {
    this.vertical_id = event.target.value;
    this.getChannelO();

  }

  selectChannel(event) {
    this.channel_id = event.target.value;
    this.getRegionals();

  }

  getRegionals() {
    this.options.dataRegional = true;
    this.service.get(this.urlRegionals+this.vertical_id+'/'+this.channel_id)
      .subscribe( resp => {
        this.regionals = resp['regionales'];
        this.acu_regional = this.regionals.reduce((acumulador, valorActual) => acumulador+valorActual.weight,0);
      })
  }

  

  updateRegional() {
    this.service.get(this.urlUpdateRegional
      +this.regionals[this.indexRegionalSelected].id+'/'+
      +this.regionals[this.indexRegionalSelected].weight)
      .subscribe( resp => {
        this.presentToast('El Peso de la regional seleccionada fue Modificado.!');
        this.getRegionals();
        this.options.Uregional = false;
      }, (error) => {
        console.log('hubo un error: ', error);
        
      })

  }

}
