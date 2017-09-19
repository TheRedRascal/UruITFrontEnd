import { ServiceResponseDetails } from './../Services/ServicesModels/ServiceResponseDetails';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import { PlayersModel } from './../Services/ServicesModels/PlayersModel';
import { ServiceResponse } from './../Services/ServicesModels/ServiceResponse';
import { WebApiServices } from './../Services/WebApiServices';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.css']
})

export class StatisticsComponent implements OnInit {
    constructor(public apiServices: WebApiServices, private ref: ChangeDetectorRef) {
    }

    errorMessage: string;
    response: ServiceResponse<PlayersModel>;
    isRequesting = true;

    ngOnInit() {
        this.GetPlayers();
    }

    GetPlayers() {
        this.apiServices.GetPlayers()
            .subscribe(message => { this.response = message; this.ref.detectChanges(); },
            error => this.errorMessage = <any>error);
    }
}
