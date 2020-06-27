import { ContactService } from './../../services/contact.service';
import { Contact } from './../../models/contact';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

  statusContact:boolean=false;
  contact:Contact={
    name:'',
    telephone:0
  };
  constructor(private contactservice:ContactService) { }

  ngOnInit() {
  }
  newContact(){
    this.contactservice.createContact(this.contact);
    this.contact={
      name:'',
      telephone:0
    }
    // this.contact.name="";
    // this.contact.telephone=0;
    this.statusContact=false;
  }
}
