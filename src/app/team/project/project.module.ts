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

import { DatatableModule, IssueModule } from '../../shared'

import { ProjectRoutingModule } from './project-routing.module';

import { ProjectComponent } from './project.component';
import { ProjectListComponent } from './c/project-list/project-list.component';
import { ProjectIssueBoardComponent } from './c/project-issue-board/project-issue-board.component';
import { ProjectFormComponent } from './c/project-form/project-form.component';
import { ProjectDetailComponent } from './c/project-detail/project-detail.component';

const COMPONENTS = [
	ProjectComponent,
	ProjectListComponent,
	ProjectIssueBoardComponent,
	ProjectFormComponent,
	ProjectDetailComponent,
]

const MODULES = [
	CommonModule,
	FlexLayoutModule,
	ReactiveFormsModule,

	DatatableModule,
	IssueModule,
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
	imports: [...MODULES],
})
export class ProjectModule { }
