/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { candidateService } from './candidate.service';
import { canVoteService } from '../canVote/canVote.service';
import { voterService } from '../voter/voter.service';

import 'rxjs/add/operator/toPromise';
import {GlobalService} from '../global.service';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css'],
  providers: [candidateService, canVoteService, voterService]
})
export class candidateComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  private role: string;

  option1= new FormControl ('', Validators.required);
  option2= new FormControl ('', Validators.required);
  option3= new FormControl ('');
  option4= new FormControl ('');
  option5= new FormControl ('');

 
  constructor(public servicecandidate: candidateService, public canVoteService: canVoteService, public voterService: voterService ,private fb: FormBuilder, private globals: GlobalService) {
    this.secondFormGroup = fb.group({
      option1: this.option1,
      option2: this.option2,
      option3: this.option3,
      option4: this.option4,
      option5: this.option5
    }, {validator: this.validateOption});
  };

  ngOnInit(): void {
    this.firstFormGroup = this.fb.group({
      firstCtrl: ['', Validators.required]
    });
  }

  private changedRole() {
    this.globals.role = this.role;
  }


	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any) {

    Object.keys(this.secondFormGroup.controls).forEach(key => {
      const politician = this.secondFormGroup.get(key).value;

      if(politician && politician.length > 0){
        this.addOneAsset(politician);
      }
    });
  }

  addOneAsset(politician): Promise<any> {
    this.asset = {
      $class: 'voting.candidate',
      'politician': politician,
      'totalVote': 0
    };

    return this.servicecandidate.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
    
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }


  deleteCandidateAsset(): Promise<any> {
    return this.servicecandidate.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
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

  deleteAllAssets(){
    this.deleteAllCanVoteAssets();
    this.deleteAllCandidateAssets();
    this.deleteAllVoterParticipants();
  }


  deleteAllCandidateAssets(): Promise<any>{
    return this.servicecandidate.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        this.currentId = asset.politician;
        this.deleteCandidateAsset();      
      });
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

  setId(id: any): void {
    this.currentId = id;
  }


  deleteCanVoteAsset(): Promise<any> {
    return this.canVoteService.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
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

  deleteAllCanVoteAssets(): Promise<any>{
    return this.canVoteService.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        this.currentId = asset.voterID;
        this.deleteCanVoteAsset();      
      });
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

  deleteVoterParticipant(): Promise<any> {
    return this.voterService.deleteParticipant(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
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

  deleteAllVoterParticipants(): Promise<any>{
    return this.voterService.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        this.currentId = asset.voterID;
        this.deleteVoterParticipant();      
      });
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

  loadAll(): Promise<any> {
    const tempList = [];
    return this.servicecandidate.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset.politician);
      });
      this.allAssets = tempList;
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

  getForm(id: any): Promise<any> {

    return this.servicecandidate.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'politician': null,
        'totalVote': null
      };

      if (result.politician) {
        formObject.politician = result.politician;
      } else {
        formObject.politician = null;
      }

      if (result.totalVote) {
        formObject.totalVote = result.totalVote;
      } else {
        formObject.totalVote = null;
      }

      this.myForm.setValue(formObject);

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

  resetForm(): void {
    this.myForm.setValue({
      'politician': null,
      'totalVote': null
      });
  }

  validateOption(group: FormGroup) {
    Object.keys(group.controls).forEach(keyy => {
      const politician = group.get(keyy).value;

     if( group.get(keyy).getError("required")){
        group.get(keyy).setErrors({
        "required":  group.get(keyy).getError("required"),
        "myError": null
       })
     } else {
      group.get(keyy).setErrors(null);
     }
      
        
      Object.keys(group.controls).forEach(key => {
        
        if(keyy!= key &&  politician!=null && politician!='' && politician==group.get(key).value){
            group.get(key).setErrors({ myError: true } );
            return { errorMessage: 'Dwie opcje są jednakowe!' }
        }

      });    
    });    
    return  null;    
  }

}


