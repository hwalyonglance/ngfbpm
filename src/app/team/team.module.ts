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

import { DatatableModule } from '../shared'

import { TeamRoutingModule } from './team-routing.module';

import { TeamComponent } from './team.component';
import { TeamFormComponent } from './c/team-form/team-form.component';
import { TeamDetailComponent } from './c/team-detail/team-detail.component';

const COMPONENTS = [
	TeamComponent,
	TeamFormComponent,
	TeamDetailComponent,
]

const MODULES = [
	CommonModule,
	FlexLayoutModule,
	ReactiveFormsModule,

	DatatableModule,


	MatCheckboxModule,
	MatButtonModule,
	MatFormFieldModule,
	MatInputModule,

	TeamRoutingModule,
]

@NgModule({
	declarations: [...COMPONENTS],
	exports: [...COMPONENTS, ...MODULES],
	entryComponents: [...COMPONENTS],
	imports: [...MODULES],
})
export class TeamModule {}
