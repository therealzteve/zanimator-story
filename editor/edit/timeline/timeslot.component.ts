import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'my-timeslot',
  templateUrl: 'timeslot.component.html',
  moduleId: module.id
})
export class TimeslotComponent implements OnInit {
  @Input()
  public timeslot;

  constructor() {  }


  ngOnInit() {}

  public addBlock(){
    this.timeslot.push([]);
  }

  public addCommandToBlock(block){
    block.push({});
  }

  public log(msg){
    console.log(msg);
  }
}
