import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';

import { MatButtonModule, MatIconModule, MatDialogModule, MatInputModule, MatSelectModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {FormsModule} from '@angular/forms';

import { AddPlayerDialogComponent } from './add-player-dialog/add-player-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    AddPlayerDialogComponent
  ],
  entryComponents: [
    AddPlayerDialogComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
