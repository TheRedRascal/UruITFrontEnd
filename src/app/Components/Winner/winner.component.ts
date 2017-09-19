import { DataService } from './../Services/DataService';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
    selector: 'app-winner',
    templateUrl: './winner.component.html',
    styleUrls: ['./winner.component.css']
})

export class WinnerComponent {
    constructor(private router: Router, public dataService: DataService) {
        if (this.dataService.Winner === undefined || this.dataService.Winner.length === 0) {
            this.router.navigate(['/home']);
        }
    }

    winner = this.dataService.Winner;

    Return() {
        this.router.navigate(['/play']);
    }
}
