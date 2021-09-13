import {Injectable, NgZone} from '@angular/core';
import { User } from "./shared/services/user";
import {auth} from 'firebase.app';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  userData: any;

  constructor(
    public angularFireStore: AngularFirestore,
    public angFireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone)
  {
    this.angFireAuth.authState.subscribe(user =>{
     if(user){
       this.userData = user;
       localStorage.setItem('user', JSON.stringify(this.userData));
       JSON.parse(localStorage.getItem('user') || "");
     }else{
       localStorage.setItem('user', "");
       JSON.parse(localStorage.getItem('user') || "");
     }
    })
  }

  SignIn(email: string, password: string) {
    return this.angFireAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['tologin-dashboard']);
        });
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  SignUp(email: string, password: string) {
    return this.angFireAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        this.SendVerificationMail();
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  SetUserData(user: User) {
    const userRef: AngularFirestoreDocument<any> = this.angularFireStore.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }

}
