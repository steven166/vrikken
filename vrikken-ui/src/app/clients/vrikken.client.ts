import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Observable } from "rxjs";
import {
  Get, Path, Put, Patch, Query, Body, Map, Produces, MediaType, Client, Delete,
  RestClient, HttpClient, Post
} from "@maxxton/angular-rest";
import { User } from "../models/user";
import { Room } from "../models/room";
import { RoomJoinResult } from "../models/room-join-result";

@Client( {
  serviceId: 'vrikken-server',
  baseUrl: "/api/v1",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
} )
@Injectable()
export class VrikkenClient extends RestClient {

  constructor( private http: Http ) {
    super( <any>http );
  }

  @Get( '/rooms/{roomNumber}' )
  @Produces( MediaType.JSON )
  public getRoom( @Path( 'roomNumber' ) roomId: number ): Observable<Room> {
    return null;
  }

  @Get( '/users/{username}' )
  @Produces( MediaType.JSON )
  public getUser( @Path( 'username' ) username: string ): Observable<User> {
    return null
  }

  @Post( '/rooms/{roomNumber}/join' )
  @Produces( MediaType.JSON )
  public joinRoom( @Path( 'roomNumber' ) roomNumber: number, @Query( 'username' ) username: string ): Observable<RoomJoinResult> {
    return null
  }

  @Post( '/rooms/{roomNumber}/leave' )
  public leaveRoom( @Path( 'roomNumber' ) roomNumber: number, @Query( 'username' ) username: string ): Observable<any> {
    return null
  }

  @Post( '/rooms/{roomNumber}/start' )
  public startRoom( @Path( 'roomNumber' ) roomNumber: number ): Observable<any> {
    return null
  }

  @Post( '/rooms/{roomNumber}/bied' )
  public bied( @Path( 'roomNumber' ) roomNumber: number, @Query( 'username' ) username: string, @Query( 'value' ) value: number ): Observable<any> {
    return null
  }

  @Post( '/rooms/{roomNumber}/pass' )
  public pass( @Path( 'roomNumber' ) roomNumber: number, @Query( 'username' ) username: string ): Observable<any> {
    return null
  }

  @Post( '/rooms/{roomNumber}/partner' )
  choosePartner( @Path( 'roomNumber' ) roomNumber: number, @Query( 'username' ) username: string, @Query( 'card-type' )type: string, @Query( 'card-index' )index: number ): Observable<any> {
    return null;
  }

  @Post( '/rooms/{roomNumber}/start-game' )
  startGame( @Path( 'roomNumber' ) roomNumber: number, @Query( 'username' ) username: string ): Observable<any> {
    return null;
  }
}
