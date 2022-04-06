import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { HttpService } from '../service/http.service';
import { NavController } from '@ionic/angular';
import { JwtService } from '../service/jwt.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.page.html',
  styleUrls: ['./upload-file.page.scss'],
})
export class UploadFilePage implements OnInit {

  private urlF = this.service.urlBase + 'test';
  file = new FormData();
  swit = 0;

  constructor(  private service: HttpService,
    public navCtrl: NavController,
    private jwtService: JwtService,
     ) { }

  ngOnInit() {
  }

  onFileSelected(event) {
    let form = event.target.files[0];
    this.file.append('excel',form);
    this.swit = 1;
  }

  saveFile( form: NgForm ){
   
    if(this.swit === 0) {
      console.log('elija un archivo');
      this.swit = 2;
    }else{
      console.log('archivo ', this.file);
      this.service.file(this.urlF, this.file)
      .subscribe( resp => {
        console.log(resp);
        Swal.fire({
          icon: 'success',
          title: 'Buen Trabajo...',
          text: 'Presupuesto asignado con exito!'
          
        });
      }) 
    }
    
    
  }

}
