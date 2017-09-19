import { Injectable } from '@angular/core';
import { Players } from '../Home/Players';

@Injectable()
export class DataService {
  PlayersData: Players = { player1: '', player2: '' };
  Winner: String;
}
