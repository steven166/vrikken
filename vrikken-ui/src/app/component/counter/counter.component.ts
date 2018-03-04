import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'counter-component',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent {


  @Output()
  bied: EventEmitter<number> = new EventEmitter();
  @Output()
  pass: EventEmitter<any> = new EventEmitter();

  @Input()
  mayPass:boolean;
  @Input()
  value:number;
  currentValue:number;

  constructor() { }

  public getValue(){
    if(this.currentValue){
      return this.currentValue;
    }
    return this.value;
  }

  public add(){
    let value = this.getValue();
    this.currentValue = value + 10;
  }

  public remove(){
    if(this.canRemove(this.getValue())){
      let value = this.getValue();
      this.currentValue = value - 10;
    }
  }

  public canRemove(value:number):boolean{
    return value - 10 >= this.value;
  }

  public canBied(value:number):boolean{
    return value >= this.value;
  }

  public doBied(){
    if(this.canBied(this.getValue())) {
      this.bied.emit( this.getValue() );
    }
  }

  public doPass(){
    this.pass.emit(null);
  }


}
