import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { COMMA, ENTER } from '@angular/cdk/keycodes'
import { MatChipInputEvent } from '@angular/material'

import { ApiService, AuthService } from '../../s'

@Component({
	selector: 'app-task-form',
	templateUrl: './task-form.component.html',
	styles: []
})
export class TaskFormComponent implements OnInit {
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
	) {
		this.buildForm()
	}
	ngOnInit() {
		console.log(this.value)
	}
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
			projectUid: ['this._project.info.uid', Validators.required],
			posterUid: ['this._auth.account.uid', Validators.required],
			title: ['', Validators.required],
			desc: ['', Validators.required],
			labels: [[], Validators.required],
			assginTo: ['', Validators.required],
			createdAt: [this._api.timestamp, Validators.required],
			updatedAt: [this._api.timestamp, Validators.required],
		})
		this._auth.state().subscribe(acc => {
			if (acc) {
				this.form.get('posterUid').setValue(acc.uid)
			}
		})
	}
}
