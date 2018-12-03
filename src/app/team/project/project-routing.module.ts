import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectComponent } from './project.component'
import { ProjectDetailComponent } from './c/project-detail/project-detail.component'
import { ProjectIssueBoardComponent } from './c/project-issue-board/project-issue-board.component'

const routes: Routes = [
	{ path: '', component: ProjectComponent },
	{ path: ':projectUid', children: [
		{ path: '', component: ProjectDetailComponent },
		{ path: 'issue', children: [
			{ path: '', component: ProjectIssueBoardComponent },
			{ path: 'report' }
		] },
	] }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ProjectRoutingModule { }
