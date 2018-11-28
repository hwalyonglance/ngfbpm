import { Component } from '@angular/core';

import { ApiService, AuthService } from './shared'

@Component({
	selector: 'app-root',
	template: `
		<a routerLink='/'>Home</a>
		<a routerLink='/project'>Project</a>
		<router-outlet></router-outlet>
	`,
	styles: [``]
})
export class AppComponent {
	columns = [
		{ id: 'id', label: 'Id', hidden: false },
		{ id: 'nama', label: 'Nama', hidden: false },
		{ id: 'jk', label: 'Jenis K', hidden: false },
		{ id: 'phone', label: 'Kontak', hidden: false },
		{ id: 'ttl', label: 'Tempat T Lahir', hidden: false },
	];
	title = 'ngfbpm';
	constructor(
		public auth: AuthService,
		public api: ApiService,
	) {}
}
