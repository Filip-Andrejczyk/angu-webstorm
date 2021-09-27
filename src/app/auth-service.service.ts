import {Injectable, NgZone} from '@angular/core';
import { User } from "./shared/services/user";
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
       JSON.parse(localStorage.getItem('user') || '{}');
     }else{
       localStorage.setItem('user', '{}');
       JSON.parse(localStorage.getItem('user') || '{}');
     }
    })
  }

  signIn(email: string, password: string) {
    return this.angFireAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['tologin-dashboard']);
        });
        console.log("to jest result.user (signIN): ", result.user);
        //this.router.navigate(['paneluzytkownika']);

      }).catch((error) => {
        window.alert(error.message)
      })
  }

  signUp(email: string, password: string) {
    return this.angFireAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {

        this.sendVerificationMail();
        if (result.user !== null){
        //this.setUserData(result.user);
          console.log("to jest result.user (signUP): ", result.user);
        }
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  sendVerificationMail() {
    return this.angFireAuth.currentUser.then(u => u?.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      })
  }
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  forgotPassword(passwordResetEmail: string) {
    return this.angFireAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      }).catch((error) => {
        window.alert(error)
      })
  }

  setUserData(user: User) {
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

  SignOut() {
    return this.angFireAuth.signOut().then(() => {
      console.log("wylogowuje");
      localStorage.removeItem('user');
      this.router.navigate(['sign-in-login']);
    })
  }

}
