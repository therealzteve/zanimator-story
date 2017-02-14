import { Injectable } from '@angular/core';
import { commandDescriptions } from '../../../data/command-descriptions';

@Injectable()
export class CommandDescriptionService {

  constructor() {  }

  public getDescriptionOf(commandType){
    return commandDescriptions[commandType];
  }
}
