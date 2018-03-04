
import { Card } from "./card";
export interface User{

  id:number;
  username:string;
  cards:Card[];
  turn:boolean;
  pass:boolean;
  started:boolean;

}
