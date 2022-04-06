import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpService } from '../service/http.service';
import { NavController } from '@ionic/angular';
import { JwtService } from '../service/jwt.service';
@Component({
  selector: 'app-view-budget-regionals',
  templateUrl: './view-budget-regionals.page.html',
  styleUrls: ['./view-budget-regionals.page.scss'],
})
export class ViewBudgetRegionalsPage implements OnInit {
  private url = this.service.urlBase + 'budget_regional/';
  private urlB = this.service.urlBase + 'budgets';
  items = [];
  pptos = [];
  constructor(  private service: HttpService,
    public navCtrl: NavController,
    private jwtService: JwtService ) { }

  ngOnInit() {
    //this.getBudgetRegionals();
    this.getBudgets();
  }

  getBudgetRegionals( id ) {
    this.service.get(this.url+id)
      .subscribe(resp => {
        this.items = resp['distribucion'];
        console.log('respuesta ', this.items);
        
      })
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

  formatterPeso = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  })

  getBudgets() {
    this.service.get(this.urlB)
      .subscribe( resp => {
        this.pptos = resp['budgets'];
        console.log('PPTO', this.pptos);
      }, (error) => {
        console.log('hubo un error');
        
      })
  }

}
