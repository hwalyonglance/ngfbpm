import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout'
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop'
import {
	MatButtonModule,
	MatChipsModule,
	MatExpansionModule,
	MatFormFieldModule,
	MatIconModule,
	MatInputModule,
	MatSelectModule,
} from '@angular/material'

import { IssueFormComponent } from './issue-form/issue-form.component';
import { IssueBoardComponent } from './issue-board/issue-board.component';
import { IssuePerAsigneeComponent } from './issue-per-asignee/issue-per-asignee.component';

const COMPONENTS = [
	IssueFormComponent,
	IssueBoardComponent,
	IssuePerAsigneeComponent,
]

const MODULES = [
	CommonModule,
	ReactiveFormsModule,

	FlexLayoutModule,

	DragDropModule,
	MatButtonModule,
	MatChipsModule,
	MatExpansionModule,
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
export class IssueModule {}
