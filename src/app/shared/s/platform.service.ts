import {
	isPlatformBrowser,
	isPlatformServer,
} from '@angular/common';
import {
	APP_ID,
	PLATFORM_ID,
	Inject,
	Injectable,
	isDevMode
} from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class PlatformService {
	readonly browser: boolean
	readonly server: boolean
	constructor(
		@Inject(PLATFORM_ID) platformId: Object,
		@Inject(APP_ID) appId: string,
	) {
		this.browser = !(this.server = isPlatformServer(platformId))
	}
}
