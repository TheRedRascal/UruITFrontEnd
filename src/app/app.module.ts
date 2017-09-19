import { StatisticsComponent } from './Components/Statistics/statistics.component';
import { WebApiServices } from './Components/Services/WebApiServices';
import { WinnerComponent } from './Components/Winner/winner.component';
import { DataService } from './Components/Services/DataService';
import { Players } from './Components/Home/Players';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { PlayersInfoComponent } from './Components/Home/playersinfo.component';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './Components/Game/game.component';
import { HttpModule } from '@angular/http';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: PlayersInfoComponent },
  { path: 'play', component: GameComponent },
  { path: 'winner', component: WinnerComponent },
  { path: 'winner', component: WinnerComponent },
  { path: 'statistics', component: StatisticsComponent }
];

@NgModule({
  declarations: [
    GameComponent,
    AppComponent,
    PlayersInfoComponent,
    WinnerComponent,
    StatisticsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    [RouterModule.forRoot(routes)],
    HttpModule
  ],
  exports: [RouterModule],
  providers: [DataService, WebApiServices],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(public dataService: DataService) {
    dataService.PlayersData = { player1: '', player2: '' };
    dataService.Winner = '';
  }
}
