import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { COMMA, ENTER } from '@angular/cdk/keycodes'
import { MatChipInputEvent } from '@angular/material'
import { ActivatedRoute, Router } from '@angular/router'

import { ApiService, AuthService } from '../../s'

@Component({
	selector: 'app-issue-form',
	templateUrl: './issue-form.component.html',
	styles: []
})
export class IssueFormComponent implements OnInit {
	get valid() { return this.form.valid }
	get value() { return this.form.value }
	set value(form) {
		for (let key in form) {
			this.form.get(key).setValue(form[key])
		}
	}
	@Input() editMode = false
	form: FormGroup
	labelsChipCtrl = new FormControl
	separatorKeysCodes: number[] = [ENTER, COMMA];
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
	addLabel(event: MatChipInputEvent): void {
		const input = event.input;
		const value = event.value;

		// Add our fruit
		if ((value || '').trim()) {
			const labels = this.value.labels
			labels.push(value.trim())
			this.form.get('labels').setValue(labels)
		}

		// Reset the input value
		if (input) {
			input.value = '';
		}

		this.labelsChipCtrl.setValue(null);
	}
	buildForm() {
		this.form = this._fb.group({
			uid: [this._api.createId(), Validators.required],
			reporterUid: ['this._auth.account.uid', Validators.required],
			assigneeUid: [''],
			title: ['', Validators.required],
			desc: ['', Validators.required],
			labels: [[]],
			state: ['TO_DO', Validators.required],
			createdAt: [this._api.timestamp, Validators.required],
			updatedAt: [this._api.timestamp, Validators.required],
		})
		let authState$ = this._auth.state()
		authState$.subscribe(acc => {
			if (acc) {
				this.form.get('reporterUid').setValue(acc.uid)
			}
			authState$ = null
		})
	}
	submit() {
		const val = this.value
		const { teamUid, projectUid } = this._activatedRoute.snapshot.params
		this._api.upsert('teams/'+teamUid+'/projects/'+projectUid+'/issues', val.uid, val)
			.subscribe(r => this.buildForm())
	}
}
