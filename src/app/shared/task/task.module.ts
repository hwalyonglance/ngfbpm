import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout'
import { ReactiveFormsModule } from '@angular/forms';
import {
	MatButtonModule,
	MatChipsModule,
	MatFormFieldModule,
	MatIconModule,
	MatInputModule,
	MatSelectModule,
} from '@angular/material'

import { TaskFormComponent } from './task-form/task-form.component';
import { TaskListComponent } from './task-list/task-list.component';

const COMPONENTS = [
	TaskFormComponent,
	TaskListComponent,
]

const MODULES = [
	CommonModule,
	ReactiveFormsModule,

	FlexLayoutModule,

	MatButtonModule,
	MatChipsModule,
	MatFormFieldModule,
	MatIconModule,
	MatInputModule,
	MatSelectModule,
]

@NgModule({
	declarations: [...COMPONENTS],
	exports: [...COMPONENTS,...MODULES],
	entryComponents: [...COMPONENTS],
	imports: [
		...MODULES
	]
})
export class TaskModule { }
