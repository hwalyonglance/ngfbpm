import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router'
import { AngularFirestore } from '@angular/fire/firestore'

import { ApiService, AuthService } from '../../../../shared'

@Component({
	selector: 'app-project-detail',
	templateUrl: './project-detail.component.html',
	styles: []
})
export class ProjectDetailComponent implements OnInit {
	constructor(
		private _activatedRoute: ActivatedRoute,
		private _router: Router,
		private _api: ApiService,
		private _auth: AuthService,
		public afs: AngularFirestore,
	) {}
	ngOnInit() {}
}
