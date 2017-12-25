import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddPlayerDialogComponent } from '../add-player-dialog/add-player-dialog.component'

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {

  players: Array<any>;
  startTurn: number;
  oddsValues: Array<number>;
  suits: Array<any>;
  totalTurns: Array<any>;
  totalPoints: Array<any>;
  playerName: string;

  constructor(
    public dialog: MatDialog
  ) {

    this.players = []

    this.startTurn = 7

    this.suits = [
      {
        name: 'heart',
        icon: 'ico-heart'
      }, {
        name: 'diamonds',
        icon: 'ico-diamonds'
      }, {
        name: 'clubs',
        icon: 'ico-clubs'
      }, {
        name: 'spades',
        icon: 'ico-spades'
      }
    ]

    this.oddsValues = Array.apply(null, {length: this.startTurn + 1}).map(Number.call, Number) // [0,1,2,3,4,5,6,7]

    this.totalPoints = [];
    this.totalTurns = this.createTurns()

  }

  createTurns() {

    let totalTurns = [];
    let tempSuits = this.suits.reverse();

    for (let i = this.startTurn; i > 0; i--) {
      totalTurns.push({
        cards: i,
        suit: tempSuits[i % 4],
        odds: [],
        results: [],
        points: [],
        total: []
      })
    }
    for (let i = 2; i <= this.startTurn; i++) {
      totalTurns.push({
        cards: i,
        suit: tempSuits[i % 4],
        odds: [],
        results: [],
        points: [],
        total: []
      })
    }

    return totalTurns

  }

  addPlayer() {

    let dialogRef = this.dialog.open(AddPlayerDialogComponent, {
      data: { playerName: this.playerName }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result.playerName) return
      this.players.push({
        name: result.playerName
      });
    });

  }

  calcPoints(turn, player) {
    turn.points[player] = turn.odds[player] == turn.results[player] ? Number(turn.results[player]) + 10 : Number(turn.results[player])

    let total = 0;
    this.totalTurns.forEach((i) => {
      total += Number(i.points[player]) || 0
    })

    this.totalPoints[player] = total;

  }

}
