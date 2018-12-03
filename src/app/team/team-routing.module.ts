import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeamComponent } from './team.component'
import { TeamDetailComponent } from './c/team-detail/team-detail.component'

const routes: Routes = [
	{ path: '', component: TeamComponent },
	{ path: ':teamUid', children: [
		{ path: 'project', loadChildren: './project/project.module#ProjectModule' },
	] }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class TeamRoutingModule { }
