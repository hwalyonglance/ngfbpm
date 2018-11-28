import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { ApiService, AuthService } from '../../shared'

@Component({
	selector: 'app-project-form',
	templateUrl: './project-form.component.html',
	styles: []
})
export class ProjectFormComponent implements OnInit {
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
			ownerUid: ['this._auth.account.uid', Validators.required],
			name: ['', Validators.required],
			desc: ['', Validators.required],
			private: [true, Validators.required],
			membersUid: [[]],
			createdAt: [this._api.timestamp, Validators.required],
			updatedAt: [this._api.timestamp, Validators.required],
		})
		this._auth.state().subscribe(acc => {
			if (acc) {
				this.form.get('ownerUid').setValue(acc.uid)
			}
		})
	}
	submit() {
		const val = this.value
		this._api.upsert('projects', val.uid, val).subscribe(null,null,() => {
			alert('reset')
			this.form.reset()
		})
	}
}
