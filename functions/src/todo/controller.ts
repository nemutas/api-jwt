import { RequestHandler } from 'express';
import { deleteDBTodo, getDBTodos, postDBTodo, putDBTodo } from './firebaseFunc';
import { TodoType } from './types';

export const getTodos: RequestHandler = async (req, res) => {
	const uid = req.jwtPayload.uid;
	try {
		const datas = await getDBTodos(uid);
		res.status(200).json(datas);
	} catch (error) {
		res.status(500).send({ error: 'Internal Server Error' });
	}
};

export const postTodo: RequestHandler = async (req, res) => {
	const uid = req.jwtPayload.uid;
	try {
		const todo = req.body as TodoType;
		await postDBTodo(uid, todo);
		res.status(200).json({ message: 'success post request' });
	} catch (error) {
		res.status(500).send({ error: 'Internal Server Error' });
	}
};

export const putTodo: RequestHandler<{ id: string }> = async (req, res) => {
	const uid = req.jwtPayload.uid;
	try {
		const id = req.params.id;
		const todo = req.body as TodoType;
		await putDBTodo(uid, id, todo);
		res.status(200).json({ message: 'success put request' });
	} catch (error) {
		res.status(500).send({ error: 'Internal Server Error' });
	}
};

export const deleteTodo: RequestHandler<{ id: string }> = async (req, res) => {
	const uid = req.jwtPayload.uid;
	try {
		const id = req.params.id;
		await deleteDBTodo(uid, id);
		res.status(200).json({ message: 'success delete request' });
	} catch (error) {
		res.status(500).send({ error: 'Internal Server Error' });
	}
};
