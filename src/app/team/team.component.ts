import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'

@Component({
	selector: 'app-team',
	template: `
		<app-team-form></app-team-form>
		<br><br><br>
		<app-datatable [columns]='teamColumns' col='teams' [extraRowMenus]='extraRowMenus' [showCreateMenu]='false' [showEditMenu]='false' [showDeleteMenu]='false' titleText='teams'></app-datatable>
		<router-outlet></router-outlet>
	`,
	styles: []
})
export class TeamComponent implements OnInit {
	extraRowMenus = [
		{ icon: 'details', label: 'Detail', action: (row) => {
			this._router.navigate(['team', row.uid, 'project'])
		} }
	]
	teamColumns = [
		{ id: 'uid', label: 'Uid', hidden: false },
		{ id: 'name', label: 'Nama', hidden: false },
		{ id: 'desc', label: 'Deskripsi', hidden: false },
		{ id: 'createdAt', label: 'createdAt', hidden: true },
		{ id: 'updatedAt', label: 'updatedAt', hidden: true },
	];
	constructor(
		private _router: Router,
	) {}
	ngOnInit() {}
}
