import { Component, OnInit } from '@angular/core';

import { ApiService, AuthService } from '../../shared'

@Component({
	selector: 'app-index',
	templateUrl: './index.component.html',
	styles: []
})
export class IndexComponent implements OnInit {
	columns = [
		{ id: 'uid', label: 'Uid', hidden: false },
		{ id: 'photoURL', label: 'Photo', is: 'img', hidden: false },
		{ id: 'displayName', label: 'Nama', hidden: false },
		{ id: 'email', label: 'Email', hidden: false },
		{ id: 'emailVerified', label: 'Verified', hidden: true },
		{ id: 'phoneNumber', label: 'Phone', hidden: false },
		{ id: 'createdAt', label: 'createdAt', hidden: true },
		{ id: 'updatedAt', label: 'updatedAt', hidden: true },
	];
	title = 'ngfbpm';
	constructor(
		public auth: AuthService,
		public api: ApiService,
	) {}
	ngOnInit(){
		this.api.get('accounts').valueChanges().subscribe(v => console.log('valueChanges', v))
	}
	google() {
		this.auth.googleLogin()
	}
}
