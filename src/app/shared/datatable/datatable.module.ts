import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import {
	MatButtonModule,
	MatCheckboxModule,
	MatDialogModule,
	MatFormFieldModule,
	MatIconModule,
	MatInputModule,
	MatMenuModule,
	MatPaginatorModule,
	MatTableModule,
	MatToolbarModule,
	MatSnackBarModule,
	MatSortModule,
} from '@angular/material';

import { MultipleSelectModule } from '../multiple-select/multiple-select.module'

import { DatatableComponent } from './datatable.component'

const MODULES = [
	CommonModule,
	FlexLayoutModule,
	FormsModule, ReactiveFormsModule,
	MultipleSelectModule,

	MatButtonModule,
	MatCheckboxModule,
	MatDialogModule,
	MatFormFieldModule,
	MatIconModule,
	MatInputModule,
	MatMenuModule,
	MatPaginatorModule,
	MatTableModule,
	MatToolbarModule,
	MatSnackBarModule,
	MatSortModule,
]

const COMPONENTS = [
	DatatableComponent,
]

@NgModule({
	declarations: [...COMPONENTS],
	exports: [
		...MODULES,
		...COMPONENTS,
	],
	imports: [
		...MODULES,
	],
})
export class DatatableModule { }
