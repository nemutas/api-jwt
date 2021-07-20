import cors from 'cors';
import express, { Request, Response } from 'express';
import * as functions from 'firebase-functions';
import { authenticateWithFirebase, authenticateWithJWT, createJWT } from './auth';
import todoRouter from './todo/router';

const app = express();
// jsonデータを扱う
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// corsの許可
app.use(cors());

// jwtの発行
app.post('/jwt', createJWT);

// jwtの確認
app.get(
	'/jwt/check',
	[authenticateWithJWT, authenticateWithFirebase],
	(req: Request, res: Response) => {
		res.status(200).json({ message: '認証されました。' });
	}
);

// .todoの処理
app.use('/v1/todo', [authenticateWithJWT, authenticateWithFirebase], todoRouter);

// テスト用のエンドポイント
app.get('/hello', (req, res) => {
	res.status(200).send({ message: 'hello, api sever!' });
});

// サーバー接続
// const port = process.env.PORT || 3001;
// app.listen(port, () => {
// 	console.log('listen on port:', port);
// });

export const api = functions.region('asia-northeast1').https.onRequest(app);
