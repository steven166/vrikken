import { Injectable } from '@angular/core';
import { VrikkenClient } from "../clients/vrikken.client";
import { User } from "../models/user";
import { Observable, ReplaySubject } from "rxjs";
import { Room } from "../models/room";
import { Card } from "../models/card";

@Injectable()
export class VrikkenService {

  private user: User;
  private userStream: ReplaySubject<User> = new ReplaySubject<User>();
  private roomNumber: number;
  private room: ReplaySubject<Room> = new ReplaySubject<Room>();
  private gameRefreshLoop: any;

  constructor( private vrikkenClient: VrikkenClient ) {
    this.registerUser();
  }

  private registerUser() {
    let username;
    try {
      username = localStorage.getItem( "vrikken.username" )
    } catch ( e ) {
      console.warn( e );
    }
    while ( !username ) {
      username = prompt( "Please enter your name" );
    }
    this.vrikkenClient.getUser( username ).subscribe( user => {
      localStorage.setItem( "vrikken.username", user.username );
      this.setUser(user);
      this.joinRoom(1);
    }, e => {
      console.error( e );
      this.registerUser();
    } );
  }

  private joinRoom(roomNumber:number){
    this.leaveRoom(this.roomNumber);
    this.roomNumber = roomNumber;
    this.vrikkenClient.joinRoom(roomNumber, this.user.username).subscribe((joinResult) => {
      if(joinResult.joined) {
        console.info(joinResult.message);
        this.gameRefreshLoop = setInterval( () => {
          this.vrikkenClient.getRoom( roomNumber ).subscribe( room => {
            this.room.next( room );
          }, e => {
            // console.error(e);
          } );
        }, 1000 );
      }else{
        console.warn(joinResult.message);
      }
    }, e => console.error(e));
  }

  public leaveRoom(roomNumber:number){
    if(this.gameRefreshLoop){
      clearInterval(this.gameRefreshLoop);
    }
    this.room.next(null);
    if(roomNumber) {
      this.vrikkenClient.leaveRoom( roomNumber, this.user.username ).subscribe( () => console.info( "Leave room " + roomNumber ), ( err ) => console.warn( "Failed to leave room " + roomNumber ) );
    }
  }

  public startRoom() {
    this.vrikkenClient.startRoom(this.roomNumber).subscribe(() => console.info("Game started"), (err) => console.error(err));
  }

  public getRoomNumber(): number {
    return this.roomNumber;
  }

  public setUser(user:User){
    this.user = user;
    this.userStream.next(user);
  }

  public getUser(): Observable<User> {
    return this.userStream;
  }

  public getRoom(): Observable<Room> {
    return this.room;
  }

  public bied(value:number){
    console.info("Bied: " + value);
    this.vrikkenClient.bied(this.roomNumber, this.user.username, value).subscribe(() => console.info("Geboden"), (err) => console.error(err));
  }

  public pass(){
    console.info("Pass");
    this.vrikkenClient.pass(this.roomNumber, this.user.username).subscribe(() => console.info("Passed"), (err) => console.error(err));
  }

  public choosePartner( card: Card ) {
    console.info("Choose partner: " + card.type + ":" + card.index);
    this.vrikkenClient.choosePartner(this.roomNumber, this.user.username, card.type, card.index).subscribe(() => console.info("Partner choosed"), (err) => console.error(err));
  }

  public startGame() {
    console.info("Start game");
    this.vrikkenClient.startGame(this.roomNumber, this.user.username).subscribe(() => console.info("Started"), (err) => console.error(err));
  }
}
