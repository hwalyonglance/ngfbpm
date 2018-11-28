import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout'
import { ReactiveFormsModule } from '@angular/forms'
import {
	MatButtonModule,
	MatCheckboxModule,
	MatFormFieldModule,
	MatInputModule,
} from '@angular/material'

import { ProjectRoutingModule } from './project-routing.module';

import { ProjectComponent } from './project.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectTaskListComponent } from './project-task-list/project-task-list.component';
import { ProjectFormComponent } from './project-form/project-form.component';

const COMPONENTS = [
	ProjectComponent,
	ProjectListComponent,
	ProjectTaskListComponent,
	ProjectFormComponent,
]

const MODULES = [
	CommonModule,
	FlexLayoutModule,
	ReactiveFormsModule,

	ProjectRoutingModule,

	MatCheckboxModule,
	MatButtonModule,
	MatFormFieldModule,
	MatInputModule,
]

@NgModule({
	declarations: [...COMPONENTS],
	exports: [...COMPONENTS, ...MODULES],
	entryComponents: [...COMPONENTS],
	imports: [
		...MODULES
	]
})
export class ProjectModule { }
