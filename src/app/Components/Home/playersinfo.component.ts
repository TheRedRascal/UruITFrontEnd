import { Component, Input } from '@angular/core';
import { Players } from './Players';
import { Router } from '@angular/router';

import { DataService } from '../Services/DataService';

@Component({
  selector: 'app-playersinfo',
  templateUrl: './playersinfo.component.html',
  styleUrls: ['./playersinfo.component.css']
})

export class PlayersInfoComponent {

  players: Players = {
    player1: '',
    player2: ''
  };

  constructor(private router: Router, public dataService: DataService) {
  }

  CanPlay() {
    const lenValidation = this.players.player1.length > 0 && this.players.player2.length > 0;
    const namesValidation = this.players.player1 !== this.players.player2;
    return lenValidation && namesValidation;
  }

  NavigateToGame() {
    this.dataService.PlayersData = this.players;
    this.router.navigate(['/play']);
  }
}
