import { ServiceResponse } from './ServicesModels/ServiceResponse';
import { PlayersModel } from './ServicesModels/PlayersModel';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class WebApiServices {
    constructor(private http: Http) { }

    apiUrl = 'http://localhost:7778/';
    headers = new Headers({ 'Content-Type': 'application/json' });
    options = new RequestOptions({ headers: this.headers });

    SaveWinner(player: PlayersModel): Observable<ServiceResponse<PlayersModel>> {
        const requestUrl = this.apiUrl + 'Api/Player/AddPlayer';
        return this.http.post(requestUrl, player, this.options)
            .map(this.GatterData)
            .catch(this.ExceptionHandler);
    }

    GetPlayers(): Observable<ServiceResponse<PlayersModel>> {
        const requestUrl = this.apiUrl + 'Api/Player/GetAll';
        return this.http.get(requestUrl, this.options)
            .map(this.GatterData)
            .catch(this.ExceptionHandler);
    }

    private ExceptionHandler(error: Response | any) {
        return Observable.throw(error.message || error);
    }

    private GatterData(res: Response) {
        const body = res.json();
        return body || {};
    }
}
