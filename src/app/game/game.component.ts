import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddPlayerDialogComponent } from '../add-player-dialog/add-player-dialog.component'

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {

  players: Array<any> = [];
  startTurn: number = 7;
  currentTurn: number = 0;
  oddsValues: Array<number> = [];
  suits: Array<any> = [];
  totalTurns: Array<any> = [];
  totalPoints: Array<any> = [];
  playerName: string;
  dealerSetted: boolean = false;

  constructor(
    public dialog: MatDialog
  ) {

    /* this.players = [{
      name: "Gianni",
      dealer: false
    }, {
      name: "Helena",
      dealer: true
    }] */

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
    this.totalTurns = this.createTurns()

  }

  createTurns() {

    let totalTurns = [];

    let turnValue = [];

    for (let i = this.startTurn; i > 0; i--) {
        turnValue.push(i)
    }

    for (let i = 2; i <= this.startTurn; i++) {
        turnValue.push(i)
    }

    for (let i = 0; i < this.startTurn * 2 - 1; i++) {
      totalTurns.push({
        cards: turnValue[i],
        suit: this.suits[i % 4],
        odds: [],
        results: [],
        points: [],
        total: [],
        oddsSetted: 0
      })
    }

    return totalTurns

  }

  addPlayer() {

    let dialogRef = this.dialog.open(AddPlayerDialogComponent, {
      data: { playerName: this.playerName, dealerSetted: this.dealerSetted}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result.playerName) return
      this.players.push({
        name: result.playerName,
        dealer: result.dealer
      });
      if (result.dealer) this.dealerSetted = true;
    });

  }

  calcPoints(turn, player) {

    turn.points[player] = turn.odds[player] == turn.results[player] ? Number(turn.results[player]) + 10 : Number(turn.results[player])

    let cumulativeOdds = 0;
    turn.odds.forEach((i) => {
      cumulativeOdds += Number(i) || 0
    })
    turn.cumulativeOdds = cumulativeOdds;

    let cumulativeResults = 0;
    turn.results.forEach((i) => {
      cumulativeResults += Number(i) || 0
    })
    turn.cumulativeResults = cumulativeResults;

    let total = 0;
    this.totalTurns.forEach((i) => {
      total += Number(i.points[player]) || 0
    })

    this.totalPoints[player] = total;

    turn.oddsSetted = turn.odds.filter(i => typeof(i) !== 'undefined').length

  }

  moveDealer() {

    let index = this.players.findIndex(i => i.dealer == true)
    this.players[index].dealer = false;

    if (index + 1 == this.players.length) {
      this.players[0].dealer = true
    } else {
      this.players[index + 1].dealer = true
    }

    this.currentTurn++;

  }

}
