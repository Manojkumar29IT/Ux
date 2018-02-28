import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { Http, RequestOptions, Headers } from '@angular/http';

@Injectable()
export class GithubService {

  jsonBody = {};

  constructor(private http: Http) { }

  getResponse(userName): Observable<any> {
    let url = 'http://localhost:3000/<userName>';
    url = url.replace('<userName>', userName);
    let res: Observable<any>;

    const headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    const options = new RequestOptions({ headers: headers });
    res = this.http.get(url, options).catch(this.handleError);
    return res;
  }

  private handleError(error: Response) {
    console.error('Server Error' + error);
    return Observable.throw(error.json());
  }
}
