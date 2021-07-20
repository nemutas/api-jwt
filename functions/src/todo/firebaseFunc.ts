import admin from 'firebase-admin';
import { firebaseApp } from '../firebase';
import { TodoType } from './types';

const db = firebaseApp.firestore();
const FieldValue = admin.firestore.FieldValue;
const rootDoc = db.collection('v1').doc('todo');

export const getDBTodos = async (uid: string) => {
	// updated_atでdesc（降順）で取得する
	const userDocument = await rootDoc.collection(uid).orderBy('updated_at', 'desc').get();

	return userDocument.docs.map(doc => ({
		id: doc.id,
		...doc.data(),
		created_at: new Date(doc.data().created_at.toDate()).toLocaleString(),
		updated_at: new Date(doc.data().updated_at.toDate()).toLocaleString()
	}));
};

export const postDBTodo = async (uid: string, todo: TodoType) => {
	// addを使うとdocument idは、ユニークなidとして自動採番される
	await rootDoc.collection(uid).add({
		...todo,
		created_at: FieldValue.serverTimestamp(),
		updated_at: FieldValue.serverTimestamp()
	});
};

export const putDBTodo = async (uid: string, docId: string, todo: TodoType) => {
	await rootDoc
		.collection(uid)
		.doc(docId)
		.update({
			...todo,
			updated_at: FieldValue.serverTimestamp()
		});
};

export const deleteDBTodo = async (uid: string, docId: string) => {
	await rootDoc.collection(uid).doc(docId).delete();
};
