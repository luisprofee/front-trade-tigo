import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { HttpService } from '../service/http.service';
import { NavController } from '@ionic/angular';
import { JwtService } from '../service/jwt.service';

@Component({
  selector: 'app-type-budget',
  templateUrl: './type-budget.page.html',
  styleUrls: ['./type-budget.page.scss'],
})
export class TypeBudgetPage implements OnInit {

  private url = this.service.urlBase + 'type/budgets';
  private urlUpdate = this.service.urlBase + 'update/type/budget/';
  budgets = [];

  constructor(  private service: HttpService,
                public navCtrl: NavController,
                private jwtService: JwtService) { }

  ngOnInit() {
    this.getTypeBudgets();
  }

  getTypeBudgets() {
    this.service.get(this.url)
      .subscribe( resp => {
        this.budgets = resp['types'] as string [];
        console.log('listado tipos de budgets ', this.budgets);
        
      }, ( err ) => {
        console.log('ocurrio un error');
        
      })
  }

  updateState( id, option) {
    this.service.get(this.urlUpdate + id + '/' + option)
      .subscribe( resp => {
        console.log(resp);
        this.getTypeBudgets();
        
      }, ( err )=>{
        console.log('ocurrio un error');
        
      })
  }

}
