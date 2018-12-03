import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router'

@Component({
	selector: 'app-project',
	templateUrl: './project.component.html',
	styles: [],
})
export class ProjectComponent implements OnInit {
	col = ''
	extraRowMenus = [
		{ icon: 'details', label: 'Detail', action: (row) => {
			this._router.navigate(['team', this._activatedRoute.snapshot.params.teamUid, 'project', row.uid])
		} }
	]
	projectColumns = [
		{ id: 'uid', label: 'Uid', hidden: false },
		{ id: 'name', label: 'Nama', hidden: false },
		{ id: 'desc', label: 'Deskripsi', hidden: false },
		{ id: 'createdAt', label: 'createdAt', hidden: true },
		{ id: 'updatedAt', label: 'updatedAt', hidden: true },
	];
	taskColumns = [
		{ id: 'uid', label: 'Uid', hidden: false },
		{ id: 'projectUid', label: 'ProjectUid', hidden: false },
		{ id: 'posterUid', label: 'PosterUid', hidden: false },
		{ id: 'title', label: 'title', hidden: false },
		{ id: 'desc', label: 'Deskripsi', hidden: false },
		{ id: 'labels', label: 'labels', hidden: false },
		{ id: 'createdAt', label: 'createdAt', hidden: true },
		{ id: 'updatedAt', label: 'updatedAt', hidden: true },
	];
	constructor(
		private _activatedRoute: ActivatedRoute,
		private _router: Router,
	) {
		let params$ = _activatedRoute.params
		params$.subscribe(params=>{
			this.col = 'teams/'+params.teamUid+'/projects'
			params$ = null
		})
	}
	ngOnInit() {}
}
