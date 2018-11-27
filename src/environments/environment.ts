// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { env } from '../../env';

export const environment = {
	...env,
	production: false,
	facebook: {
		id: '2040127382675897',
		secret: '7457d577a4e02475b89d77213798fea5',
	},
	firebase: {
		apiKey: "AIzaSyDcjrgTXH8PjxmhuYYXx8vsJ-v00didLhs",
		authDomain: "rwprdev.firebaseapp.com",
		databaseURL: "https://rwprdev.firebaseio.com",
		projectId: "rwprdev",
		storageBucket: "rwprdev.appspot.com",
		messagingSenderId: "572964621585"
	},
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/dist/zone-error';  // Included with Angular CLI.
