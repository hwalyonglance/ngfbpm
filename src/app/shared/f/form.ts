import {
	AbstractControl,
	AsyncValidatorFn,
	FormControl,
	FormGroup,
	NG_VALIDATORS,
	Validator,
	ValidatorFn,
	Validators,
} from '@angular/forms'

import { Observable } from 'rxjs'
import {
	debounceTime,
	distinctUntilChanged,
	map,
	take,
	tap,
} from 'rxjs/operators'

import { ApiService } from '../s/api.service'
import * as util from './util'

export const validators = {
	match(name1: string, name2: string) {
		return (control: AbstractControl) => {
			return control.get(name1).value === control.get(name2).value ? null : { match: false, mismatch: true }
		}
	},
	matches(...controlNames: string[]): ValidatorFn {
		return (control: AbstractControl) => {
			const values = controlNames.map(n => control.get(n).value)
			const value0 = values[0]
			return values.every(v => v === value0) ? null : { match: false, mismatch: true }
		}
	},
	passwordMatchValidator(g: FormGroup) {
		return g.get('password').value === g.get('password1').value
		? null : {'mismatch': true};
	},
	strongPassword(): ValidatorFn {
		return (control: AbstractControl): {[k: string]: any} => {
			return util.strongPassword(control.value)
		}
	},
	unique(api: ApiService, table: string, key: string): AsyncValidatorFn {
		return (control: AbstractControl): Observable<Object> => {
			const value = control.value
			return api.check(table, key, value).valueChanges()
				.pipe(
					debounceTime(255),
					distinctUntilChanged(),
					take(1),
					tap(v => console.log('unique ', v)),
					map((res: any) => res.duplicate ? { duplicate: true } : null)
				)
		}
	}
}
