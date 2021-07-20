import admin from 'firebase-admin';

export const firebaseApp = admin.initializeApp({
	// databaseURL: 'https://nemutas-express-jwt.firebaseio.com'
	databaseURL: 'https://nemutas-express-jwt.asia-northeast1.firebasedatabase.app'
});
