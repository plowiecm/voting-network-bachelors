import { Component, OnInit } from '@angular/core';
import {GlobalService} from '../global.service';
import {candidateService} from '../candidate/candidate.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
  providers: [candidateService]
})
export class ResultsComponent implements OnInit {
  title: string ='';
  categories = ['a','b'];
  data = ['1','20'];
  private errorMessage;

  ngOnInit(): void {
    this.loadAll();
  }

  constructor(private globals: GlobalService, private servicecandidate: candidateService) { 
    this.title = globals.role;
  }
  
  public crosshair: any = {
    visible: true,
    tooltip: {
        visible: true,
        format: '#.##'
    }
  };

  loadAll(): Promise<any> {
    const tempList = [];
    const tempListData = [];

    return this.servicecandidate.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset.politician);
        tempListData.push(asset.totalVote);
      });
      this.categories = tempList;
      this.data = tempListData;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

}
