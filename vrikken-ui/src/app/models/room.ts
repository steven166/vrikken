
import { User } from "./user";
import { Camp } from "./camp";

export interface Room {

  roomId:number;
  status:string;
  users:User[];
  playingCamp:Camp;
  oppositesCamp:Camp;


}
