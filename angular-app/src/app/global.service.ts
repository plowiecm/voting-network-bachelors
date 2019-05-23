import { Injectable } from '@angular/core';

@Injectable()
export class GlobalService {
  role: string = 'TYTUŁ GŁOSOWANIA';
  voterId: string = '';
  globalCount: string = '';
  constructor() { }
}