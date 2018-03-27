import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class HttpService {

  private domain: string;
  private port: string;

  constructor(public http: HttpClient) {
    this.http.get('assets/conf.json').subscribe((data: Conf) => {
      this.domain = data.domain;
      this.port = data.port;
    });
  }

  postData(url: string, data: any): Observable<Object> {
    let httpOptions = {};
    if (localStorage.getItem('token') != null) {
      httpOptions = {
        headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})
      };
    }
    return this.http.post('http://' + this.domain + ':' + this.port + '/' + url, data, httpOptions);
  }

  getData(url: string): Observable<Object> {
    let httpOptions = {};
    if (localStorage.getItem('token') != null) {
      httpOptions = {
        headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})
      };
    }
    return this.http.get('http://' + this.domain + ':' + this.port + '/' + url, httpOptions);
  }
}

class Conf {
  constructor(public domain: string, public port: string) {}
}
