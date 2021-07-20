declare namespace Express {
	export interface Request {
		jwtPayload: { uid: string; name: string };
	}
}
