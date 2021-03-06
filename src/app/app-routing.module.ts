import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './c/index/index.component'

const routes: Routes = [
	{ path: '', component: IndexComponent } ,
	{ path: 'team', loadChildren: './team/team.module#TeamModule' },
	{ path: '**', pathMatch: 'full', redirectTo: '/' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
