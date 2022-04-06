import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { HttpService } from '../service/http.service';
import { NavController } from '@ionic/angular';
import { JwtService } from '../service/jwt.service';

@Component({
  selector: 'app-view-actions',
  templateUrl: './view-actions.page.html',
  styleUrls: ['./view-actions.page.scss'],
})
export class ViewActionsPage implements OnInit {

  private url = this.service.urlBase + 'planes';
  private urlUpdate = this.service.urlBase + 'update/plan/';
  planes = [];


  constructor(  private service: HttpService,
                public navCtrl: NavController,
                private jwtService: JwtService) { }

  ngOnInit() {
    this.getActionPlan();
  }

  getActionPlan() {
    this.service.get(this.url)
      .subscribe( resp => {
        this.planes = resp['planes'] as string [];
        console.log('listado de planes ', this.planes);
        
      }, ( err ) => {
        console.log('ocurrio un error');
        
      })
  }

  updateState( id, option ) {
    this.service.get(this.urlUpdate + id + '/' + option)
      .subscribe( resp => {
        console.log(resp);
        this.getActionPlan();
        
      }, ( err )=>{
        console.log('ocurrio un error');
        
      })
  }

}
