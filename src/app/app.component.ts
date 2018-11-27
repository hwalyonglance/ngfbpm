import { Component } from '@angular/core';

import { ApiService, AuthService } from './shared'

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	columns = [
		{ id: 'id', label: 'Id', hidden: false },
		{ id: 'nama', label: 'Nama', hidden: false },
		{ id: 'jk', label: 'Jenis K', hidden: false },
		{ id: 'phone', label: 'Kontak', hidden: false },
		{ id: 'ttl', label: 'Tempat T Lahir', hidden: false },
	];
	title = 'ngfbpm';
	tasks = [
		{ uid: Date.now(), title: btoa((Date.now()*Math.random()).toString()), poster: 'z', assignedTo: ['a','b'] },
		{ uid: Date.now(), title: btoa((Date.now()*Math.random()).toString()), poster: 'z', assignedTo: [] },
		{ uid: Date.now(), title: btoa((Date.now()*Math.random()).toString()), poster: 'x', assignedTo: ['a'] },
		{ uid: Date.now(), title: btoa((Date.now()*Math.random()).toString()), poster: 'z', assignedTo: ['b'] },
	]
	constructor(
		public auth: AuthService,
		public api: ApiService,
	) {
		auth.state().subscribe(a=>{
			if (a) {
				console.log({
					uid: a.uid,
					displayName: a.displayName,
					email: a.email,
					photoURL: a.photoURL,
				})
				console.log(a.toJSON())
			}
		})
	}
	google() {
		this.auth.googleLogin()
	}
}
