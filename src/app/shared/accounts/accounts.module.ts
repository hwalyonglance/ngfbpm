import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout'
import {
	MatButtonModule,
	MatIconModule,
} from '@angular/material'

import { AccountsTableComponent } from './accounts-table/accounts-table.component';

const COMPONENTS = [
	AccountsTableComponent,
]

const MODULES = [
	CommonModule,
	FlexLayoutModule,
]

@NgModule({
	declarations: [...COMPONENTS],
	entryComponents: [...COMPONENTS],
	exports: [...COMPONENTS, ...MODULES],
	imports: [...MODULES]
})
export class AccountsModule { }
