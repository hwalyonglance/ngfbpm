import { ɵComponentType as ComponentType, TemplateRef } from '@angular/core'
import {
	AbstractControl,
	FormControl,
	FormGroup,
	NG_VALIDATORS,
	Validator,
	ValidatorFn,
	Validators,
} from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';

import {
	BehaviorSubject,
	Observable,
	of,
} from 'rxjs';
import { filter, map, startWith, switchMap } from 'rxjs/operators'

export class Autocomplete<T> {
	dataChange: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
	get data(): T[] { return this.dataChange.getValue().slice(); }
	set data(data: T[]){ this.dataChange.next(data) }
	get valid(): Observable<number> {
		return this.filteredOptions
					.pipe(
						switchMap((d, i) => of(i))
					)
	}

	filteredOptions: Observable<T[]>;

	constructor(
		public control: AbstractControl, public _data: T[] = []
	){
		this.dataChange = new BehaviorSubject<T[]>(_data);
		this.filteredOptions = control.valueChanges
										.pipe(
											startWith(''),
											map(v => v ? this.filter(v) : this.data )
										)
	}
	filter(v): T[] {
		return this.data.filter(option => {
			return Object.values(option)
							.join('')
							.toLowerCase()
							.indexOf(
								Object.values(v)
									.join('')
									.toLowerCase()
							) != -1
		}) || [];
	}
}

export interface PasswordProp {
	icon	?: 'visibility' | 'visibility_off',
	tooltip	?: 'Tampilkan' | 'Sembunyikan',
	type	?: 'password' | 'text',
}

export class Password {
	icon	: 'visibility' | 'visibility_off' = 'visibility'
	tooltip	: 'Tampilkan' | 'Sembunyikan' = 'Tampilkan'
	type	: 'password' | 'text' = 'password'
	toggle () {
		this.icon =  this.icon === 'visibility' ? 'visibility_off' : 'visibility'
		this.tooltip = this.tooltip === 'Tampilkan' ? 'Sembunyikan' : 'Tampilkan'
		this.type =  this.type == 'password' ? 'text' : 'password'
		setTimeout(() => {
			this.icon		= 'visibility'
			this.tooltip	= 'Tampilkan'
			this.type		= 'password'
		}, 1000)
	}
	constructor() {}
}

export class Form {
	static readonly Password = Password
	static readonly Autocomplete = Autocomplete
	static readonly RULES = {
		id: ['', Validators.required],
		authId: [''],
		createdAt: [''],
		updatedAt: [''],
	}
}
