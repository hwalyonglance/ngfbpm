import { env } from '../../env';

export const environment = {
	...env,
	production: true,
	facebook: {
		id: '2163970277195176',
		secret: 'd70986b71034bbbda9930c70b15cbab3',
	},
	firebase: {
		apiKey: "AIzaSyCTHznLAbPm1EFv3PRbXywWKCD0d8qjfL4",
		authDomain: "rwprprod.firebaseapp.com",
		databaseURL: "https://rwprprod.firebaseio.com",
		projectId: "rwprprod",
		storageBucket: "rwprprod.appspot.com",
		messagingSenderId: "515735803310"
	},
};

// https://rwprprod.firebaseapp.com/__/auth/handler
// ID klien web 96940340083-52af8u46qveg24edom7rrkhe5d7vd2o3.apps.googleusercontent.com
// Rahasia klien web au6O3hBSgsl7NxQS4RO_IybY
