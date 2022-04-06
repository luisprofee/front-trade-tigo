import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor( private http: HttpClient) { }

  userToken: string;
  urlBase: string = 'https://back.teloconsigo.net/api/';

  // get(url: string){
  //   return axios.get(url);
  // }

  get(url: string) {
    return this.http.get(url)
    .pipe(
      map( resp => {
        return resp;
      })
    );
  }



  post( url: string, datos: object ) {
    
    return this.http.post( url, datos )
    .pipe(
      map( resp => {
        return resp;
      })
    )
  }

  getCustomHeaders(): HttpHeaders {
    const headers = new HttpHeaders()
      .set('Content-Type', 'multipart/form-data');
    return headers;
  }

  file( url, datos ) {
    let headers = this.getCustomHeaders();
    //let headers = header1.append( 'Content-Type','multipart/form-data')
    
    return this.http.post( url, datos )
    .pipe(
      map( resp => {
        return resp;
      })
    )
  }


}
