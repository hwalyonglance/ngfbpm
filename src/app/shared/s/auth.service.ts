import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material'

import { BehaviorSubject, Observable, of, from } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators'
import * as firebase from 'firebase/app';

import { environment } from '../../../environments/environment';

import { ErrorDialogComponent } from '../dialog'
import { ApiService } from './api.service'

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	get account() { return this._account.getValue() }
	apiUrl = environment.apiUrl
	private _account = new BehaviorSubject(null)
	constructor(
		private _afa: AngularFireAuth,
		private _afs: AngularFirestore,
		public api: ApiService,
		private _matDialog: MatDialog,
	) {
		_afa.authState.subscribe(account => {
			if (account) {
				const acc = {
					uid: account.uid,
					displayName: account.displayName,
					photoURL: account.photoURL,
					email: account.email,
					emailVerified: account.emailVerified,
					phoneNumber: account.phoneNumber,
					isAnonymous: account.isAnonymous,
					providerId: account.providerId,
				}
				this._account.next(acc)
				api.upsert('accounts', acc['uid'], acc)
			}
		})
	}
	private _oAuthLogin(provider: firebase.auth.AuthProvider): Promise<void> {
		return this._afa.auth.signInWithPopup(provider)
			.then((credential) => {
				// console.log(credential)
			})
			.catch((error) => {
				let errorDialog = this._matDialog.open(ErrorDialogComponent, {
					data: error
				})
				errorDialog.componentInstance.close.subscribe(() => {
					errorDialog.close()
					errorDialog = null
				})
			});
	}
	////// OAuth Methods /////
	googleLogin(): Observable<void> {
		return from(this._oAuthLogin(new firebase.auth.GoogleAuthProvider()));
	}
	githubLogin(): Observable<void> {
		return from(this._oAuthLogin(new firebase.auth.GithubAuthProvider()));
	}
	facebookLogin(): Observable<void> {
		return from(this._oAuthLogin(new firebase.auth.FacebookAuthProvider()));
	}
	twitterLogin(): Observable<void> {
		return from(this._oAuthLogin(new firebase.auth.TwitterAuthProvider()));
	}
	anonymousLogin(): Observable<firebase.auth.UserCredential> {
		return from(this._afa.auth.signInAnonymously())
	}
	emailSignUp(email: string, password: string): Observable<firebase.auth.UserCredential> {
		return from(this._afa.auth.createUserWithEmailAndPassword(email, password))
	}
	emailLogin(email: string, password: string): Observable<firebase.auth.UserCredential> {
		return from(this._afa.auth.signInWithEmailAndPassword(email, password))
	}
	resetPassword(email: string): Observable<void> {
		return from(firebase.auth().sendPasswordResetEmail(email))
	}
	signOut(): Observable<{}> {
		return from(this._afa.auth.signOut())
			.pipe(tap(() => this._account.next(null)))
	}
	state() {
		return this._afa.authState
	}
}
