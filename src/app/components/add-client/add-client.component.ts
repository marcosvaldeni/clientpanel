import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';

import { Client } from '../../models/Client';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  }

  disableBalanceOnAdd: boolean = true;
  @ViewChild('clientForm', {static:false}) form: any;

  constructor(
    private flashMessage: FlashMessagesService,
    private clientSevice: ClientService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.flashMessage.show('We are in about component!', { cssClass: 'alert-success', timeout: 4000 });
  }

  onSubmit({value, valid}: {value: Client, valid: boolean}) {

    console.log(value, valid);

    if(this.disableBalanceOnAdd) {
      value.balance = 0;
    }

    if(!valid) {
      this.flashMessage.show('Please fill out the form correctly', {
        cssClass: 'alert-danger', timeout: 4000
      });
    } else {
      this.clientSevice.newClient(value)
      this.flashMessage.show('New client added', {
        cssClass: 'alert-success', timeout: 4000
      });
      this.router.navigate(['/']);
    }
  }

}
