import { Contact } from './../../models/contact';
import { ContactService } from './../../services/contact.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-contacts',
  templateUrl: './list-contacts.component.html',
  styleUrls: ['./list-contacts.component.css']
})
export class ListContactsComponent implements OnInit {

  statusContact=false;
  myContact:Contact; 

  contacts;
  constructor(private contactservice:ContactService) { }

  ngOnInit() {
    this.contactservice.getContacts().subscribe(
      contacts=>{
        this.contacts=contacts;
        console.log(this.contacts);
        
      })
  }

  updateContact(contact){
    this.contactservice.updateContact(contact)
    this.statusContact=false;
  }

  editContact(contact){
    this.statusContact=true;
    this.myContact=contact;
  }
  deleteContact(contact){
      if(confirm("Are you sure to delete this contact !!"))
      {    
        this.contactservice.destroyContact(contact);
      }else{
        this.statusContact=false;
      }
  }
}
