import { Component, OnInit } from '@angular/core';
import {GlobalService} from '../global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title: string ='';

  constructor(private globals: GlobalService) { 
    this.title = globals.role;
  }

  ngOnInit() {
  }

}
