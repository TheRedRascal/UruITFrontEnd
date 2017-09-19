import { ServiceResponse } from './../Services/ServicesModels/ServiceResponse';
import { PlayersModel } from './../Services/ServicesModels/PlayersModel';
import { WebApiServices } from './../Services/WebApiServices';
import { Scores } from './scores';
import { Players } from './../Home/Players';
import { DataService } from './../Services/DataService';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})

export class GameComponent {

  constructor(private router: Router, public dataService: DataService, public apiServices: WebApiServices) {
    if (this.dataService.PlayersData.player1 === '' || this.dataService.PlayersData.player2 === '') {
      this.router.navigate(['/home']);
    }
  }

  playerInfo: Players = this.dataService.PlayersData;
  round = 1;
  selectedValue = 'default';
  activePlayer = this.playerInfo.player1;
  playerOneMove = '';
  playerTwoMove = '';
  playerOneVictories = 0;
  playerTwoVictories = 0;
  scores: Scores[] = [];
  errorMessage: String;
  response: ServiceResponse<PlayersModel>;

  CanPlay() {
    return this.selectedValue !== 'default';
  }

  UpdatePlayersInfo() {
    if (this.playerOneMove === '') {
      this.playerOneMove = this.selectedValue;
      this.activePlayer = this.playerInfo.player2;
      this.selectedValue = 'default';
    } else if (this.playerTwoMove === '') {
      this.playerTwoMove = this.selectedValue;
    }
  }

  UpdateWinner() {
    if ((this.playerOneMove === 'R' && this.playerTwoMove === 'S') || (this.playerOneMove === 'P' && this.playerTwoMove === 'R')
      || ((this.playerOneMove === 'S' && this.playerTwoMove === 'P'))) {
      this.playerOneVictories++;

      const score: Scores = {
        round: this.round,
        winner: this.playerInfo.player1
      };

      this.scores.push(score);
    } else if (this.playerOneMove === this.playerTwoMove) {
      this.ResetData();
      return false;
    } else {
      const score: Scores = {
        round: this.round,
        winner: this.playerInfo.player2
      };

      this.scores.push(score);
      this.playerTwoVictories++;
    }

    return true;
  }

  UpdateScores() {
    if ((this.playerOneMove === 'R' && this.playerTwoMove === 'S') || (this.playerOneMove === 'P' && this.playerTwoMove === 'R')
      || ((this.playerOneMove === 'S' && this.playerTwoMove === 'P'))) {
      this.playerOneVictories++;

      const score: Scores = {
        round: this.round,
        winner: this.playerInfo.player1
      };

      this.scores.push(score);
    } else if (this.playerOneMove === this.playerTwoMove) {
      this.ResetData();
      return;
    } else {
      const score: Scores = {
        round: this.round,
        winner: this.playerInfo.player2
      };

      this.scores.push(score);
      this.playerTwoVictories++;
    }

    this.CheckIfWinner();
    this.ResetData();
  }

  CheckIfWinner() {
    if (this.playerOneVictories >= 3) {
      this.dataService.Winner = this.dataService.PlayersData.player1;
      this.SaveWinner(this.dataService.PlayersData.player1);
      this.router.navigate(['/winner']);
    }

    if (this.playerTwoVictories >= 3) {
      this.dataService.Winner = this.dataService.PlayersData.player2;
      this.SaveWinner(this.dataService.PlayersData.player2);
      this.router.navigate(['/winner']);
    }
  }

  SaveWinner(winner: String) {
    const WinnerModel: PlayersModel = {
      PlayerId: 0,
      Name: winner,
      Score: 0
    };


    this.apiServices.SaveWinner(WinnerModel)
      .subscribe(message => this.response = message,
      error => this.errorMessage = <any>error);
  }

  SetMove() {

    this.UpdatePlayersInfo();

    if (this.playerOneMove !== '' && this.playerTwoMove !== '') {
      this.UpdateScores();
    }
  }

  ResetData() {
    this.selectedValue = 'default';
    this.activePlayer = this.playerInfo.player1;
    this.playerOneMove = '';
    this.playerTwoMove = '';
    this.round++;
  }
}
