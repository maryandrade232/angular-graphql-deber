import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import { MessageModel } from './../models/message.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GET_MESSAGES } from './../services/message.graphql';
import { Response } from './../models/responseMessage.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
messages: Observable<MessageModel[]> | undefined;

  constructor(private apollo: Apollo) {
   }

  ngOnInit(): void {
   this.synch();
  }

  synch(): void {
      this.messages = this.apollo.watchQuery<Response>({
        query: GET_MESSAGES,
      }).valueChanges.pipe(
        map((result) => result.data.getMessages)
      );

}
}
