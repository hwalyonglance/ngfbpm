import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'

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
		public afs: AngularFirestore,
	) {}
	check(col: string, key: string, value: any) {
		return this.afs.collection(col, ref => ref.where(key, '==', value));
	}
	get(col: string) {
		return this.afs.collection(col)
	}
	insert(col: string, data, uid: string='') {
		const _data = {
			createdAt: this.timestamp,
			updatedAt: this.timestamp,
			...data
		}
		if (uid == '') {
			return this.afs.collection(col).add(_data);
		} else {
			return this.afs.collection(col).doc(uid).set(_data)
		}
	}
	update(col: string, uid: string, data): Promise<void> {
		return this.afs.collection(col).doc(uid).update({ ...data, updatedAt: this.timestamp });
	}
	upsert(col: string, uid: string, data) {
		const doc =  this.afs.collection(col).doc(uid).snapshotChanges().pipe(take(1)).toPromise();
		return doc.then((snap): any => {
			return snap.payload.exists ? this.update(col, uid, data) : this.insert(col, data, uid);
		})
	}
	deleteById(col: string, uid: string) {
		return from(this.afs.collection(col).doc(uid).delete())
	}
}
