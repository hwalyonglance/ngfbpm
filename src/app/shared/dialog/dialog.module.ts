import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	MatButtonModule,
	MatDialogModule,
} from '@angular/material'

import { SaveConfirmationDialogComponent } from './save-confirmation-dialog/save-confirmation-dialog.component';
import { SaveChangeConfirmationDialogComponent } from './save-change-confirmation-dialog/save-change-confirmation-dialog.component';
import { FailedToSaveDialogComponent } from './failed-to-save-dialog/failed-to-save-dialog.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';

const MODULES = [
	CommonModule,

	MatButtonModule,
	MatDialogModule,
]

const COMPONENTS = [
	SaveConfirmationDialogComponent,
	SaveChangeConfirmationDialogComponent,
	FailedToSaveDialogComponent,
	ErrorDialogComponent,
]

@NgModule({
	declarations: [
		...COMPONENTS,
	],
	entryComponents: [
		...COMPONENTS,
	],
	exports: [
		...COMPONENTS,
	],
	imports: [
		...MODULES,
	]
})
export class DialogModule { }
