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

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DataService } from './data.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {FileSelectDirective} from 'ng2-file-upload';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {
  MatCheckboxModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatStepperModule,
  MatRippleModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatRadioModule,
  MatSnackBarModule
} from '@angular/material';

import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSortModule} from '@angular/material/sort';

import { canVoteComponent } from './canVote/canVote.component';
import { candidateComponent } from './candidate/candidate.component';

import { voterComponent } from './voter/voter.component';

import { voteComponent } from './vote/vote.component';

import {GlobalService} from './global.service';

  @NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    canVoteComponent,
    candidateComponent,
    voterComponent,
    voteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatRadioModule,    
      BrowserModule,
      AppRoutingModule,
      MatButtonModule,
      MatCardModule,
      MatDialogModule,
      FormsModule,
      MatExpansionModule,
      MatInputModule,
      MatListModule,
      MatIconModule,
      BrowserAnimationsModule,
      NgbModule.forRoot(),
      HttpClientModule,
      HttpModule,
      MatStepperModule,
      ReactiveFormsModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatSelectModule,
      MatFormFieldModule,
      MatRippleModule,
      MatSortModule  
  ],
  providers: [
    DataService,
    GlobalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
