import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'

import { ApiService, AuthService } from '../../../../shared'

@Component({
	selector: 'app-project-form',
	templateUrl: './project-form.component.html',
	styles: []
})
export class ProjectFormComponent implements OnInit {
	private _teamUid = ''
	get valid() { return this.form.valid }
	get value() { return this.form.value }
	set value(value) {
		for (let k in value) {
			this.form.get(k).setValue(value[k])
		}
	}
	@Input() editMode: false
	form: FormGroup
	constructor(
		private _fb: FormBuilder,
		private _api: ApiService,
		private _auth: AuthService,
		private _activatedRoute: ActivatedRoute,
		private _router: Router,
	) {
		this.buildForm()
	}
	ngOnInit() {}
	buildForm() {
		this.form = this._fb.group({
			uid: [this._api.createId(), Validators.required],
			ownerUid: [null, Validators.required],
			name: ['', Validators.required],
			desc: ['', Validators.required],
			state: ['TO_DO', Validators.required],
			createdAt: [this._api.timestamp, Validators.required],
			updatedAt: [this._api.timestamp, Validators.required],
		})
		let authState$ = this._auth.state()
		authState$.subscribe(acc => {
			if (acc) {
				this.form.get('ownerUid').setValue(acc.uid)
			}
			authState$ = null
		})
		let params$ = this._activatedRoute.params
		params$.subscribe(param => {
			this._teamUid = param.teamUid
			params$ = null
		})
	}
	submit() {
		const val = this.value
		this._api.upsert('teams/'+this._teamUid+'/projects', val.uid, val).subscribe(null,null,() => {
			this.buildForm()
		})
	}
}
