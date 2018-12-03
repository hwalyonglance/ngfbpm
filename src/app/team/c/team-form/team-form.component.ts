import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { ApiService, AuthService } from '../../../shared'

@Component({
	selector: 'app-team-form',
	templateUrl: './team-form.component.html',
	styles: []
})
export class TeamFormComponent implements OnInit {
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
	) {
		this.buildForm()
	}
	ngOnInit() {}
	buildForm() {
		this.form = this._fb.group({
			uid: [this._api.createId(), Validators.required],
			leaderUid: ['this._auth.account.uid', Validators.required],
			name: ['', Validators.required],
			desc: ['', Validators.required],
			private: [true, Validators.required],
			membersUid: [[]],
			createdAt: [this._api.timestamp, Validators.required],
			updatedAt: [this._api.timestamp, Validators.required],
		})
		let authState = this._auth.state();
		authState.subscribe(acc => {
			if (acc) {
				this.form.get('leaderUid').setValue(acc.uid)
				authState = null
			}
		})
	}
	submit() {
		const val = this.value
		this._api.upsert('teams', val.uid, val).subscribe(null,null,() => {
			this.buildForm()
		})
	}
}
