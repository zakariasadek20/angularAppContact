import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore'
import { Observable, from } from 'rxjs';
import { Contact } from '../models/contact';
import {map} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contactDoc:AngularFirestoreDocument<Contact>;
  contactColection:AngularFirestoreCollection<Contact>;
  contacts:Observable<Contact[]>;

  constructor(private afs:AngularFirestore) { 
    this.contactColection=afs.collection('contacts')
    // this.contacts=this.contactColection.valueChanges();
    this.contacts=this.contactColection.
    snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Contact;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }
  getContacts(){
    return this.contacts;
  }

  createContact(contact:Contact){
   // this.afs.collection('contacts').add(contact);
    this.contactColection.add(contact);
  }
  updateContact(contact:Contact){
    this.contactDoc=this.contactColection.doc<Contact>(contact.id);
    this.contactDoc.update(contact);
  }
  destroyContact(contact:Contact){
    this.contactDoc=this.contactColection.doc<Contact>(contact.id);
    this.contactDoc.delete();
  }
}

