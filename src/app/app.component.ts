import { Observable, from } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  courses:Observable<any[]>
  clients:Observable<any[]>
  constructor(private db:AngularFireDatabase){
    //Pour un object simple
    this.courses=db.list('courses').valueChanges();

    // //pour un object Complex
    // this.courses=db.list('courses').snapshotChanges()
    // .pipe(
    //   map(changes => 
    //     changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    //   )
    // );

    //Pour un object Complex
    this.clients=db.list('clients').snapshotChanges().pipe(
      map(changes=>
        changes.map(c=> ({key: c.payload.key,...c.payload.val() }) )
        )
    );

  }

  add(data){
    this.db.list('courses').push(data.value);
    this.db.list('clients').push({
      balance:247,
      firstName:"ayoub",
      lastName:"khalil",
      phone:"062142254",
      email:"gmail.com"
    });
    data.value="";
  }
 
  update(key,value){
    //update dans database
    // this.db.list('clients').update(key,{
    //   lastName:value //mis a jour attrubute lastname
    // })
    this.db.list('clients').set(key,{
      lastName:value //katseprimer les attribu et kaat remplaciHom bi Had attribu
    })
  }
  delete(key){
    //delete by Key
    this.db.list('clients').remove(key);
    this.db.list('clients').remove();//delete All
  }
}
