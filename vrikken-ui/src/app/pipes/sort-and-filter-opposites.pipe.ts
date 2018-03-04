import { Pipe, PipeTransform } from '@angular/core';
import { User } from "../models/user";

@Pipe({
  name: 'sortAndFilterOpposites'
})
export class SortAndFilterOppositesPipe implements PipeTransform {

  transform(users: User[], username: string): any {
    // Find current index
    let startIndex = 0;
    for(let i = 0; i < users.length; i++){
      if(users[i].username.toLowerCase() === username.toLowerCase()){
        startIndex = i;
        break;
      }
    }
    // Create new list
    let newUsers = [];
    for(let i = startIndex; i < startIndex + users.length; i++){
      let j = i;
      while(j >= users.length){
        j = j - users.length;
      }
      let user = users[j];
      if(user.username.toLowerCase() !== username.toLowerCase()){
        newUsers.push(user);
      }
    }
    return newUsers;
  }

}
