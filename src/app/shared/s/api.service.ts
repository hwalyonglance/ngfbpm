import { Injectable } from '@angular/core';
import { AngularFirestore, QueryFn } from '@angular/fire/firestore'

import { BehaviorSubject, Observable, of, from } from 'rxjs';
import { map, filter, take, tap } from 'rxjs/operators'

import * as firebase from 'firebase';

import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class ApiService {
	apiUrl = environment.apiUrl
	get timestamp() {
		return Date.now()
	}
	constructor(
		private afs: AngularFirestore,
	) {}

	check(col: string, key: string, value: any) {
		return this.afs.collection(col, ref => ref.where(key, '==', value));
	}
	createId() {
		return this.afs.createId()
	}
	col(col: string, queryFn?: QueryFn) {
		return this.afs.collection(col, queryFn)
	}
	doc(doc: string) {
		return this.afs.doc(doc)
	}
	insert(col: string, data, uid: string='') {
		const _data = {
			createdAt: this.timestamp,
			updatedAt: this.timestamp,
			...data
		}
		if (uid == '') {
			return from(this.afs.collection(col).add(_data));
		} else {
			return from(this.afs.collection(col).doc(uid).set(_data))
		}
	}
	update(col: string, uid: string, data): Observable<void> {
		return from(this.afs.collection(col).doc(uid).update({ ...data, updatedAt: this.timestamp }));
	}
	upsert(col: string, uid: string, data) {
		const doc =  this.afs.collection(col).doc(uid).snapshotChanges().pipe(take(1)).toPromise();
		return from(doc.then((snap): any => {
			return snap.payload.exists ? this.update(col, uid, data) : this.insert(col, data, uid);
		}))
	}
	deleteById(col: string, uid: string) {
		return from(this.afs.collection(col).doc(uid).delete())
	}
}
