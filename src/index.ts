import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';

export default function an48<T>() {
	const handler = nextConnect<NextApiRequest, NextApiResponse<T>>();

	if (process.env.NODE_ENV === 'development') {
		return handler.use<NextApiRequest, NextApiResponse<T>>((req, res, next) => {
			const acao = req.headers.origin;	// app开发工具请求时可能不带有该参数,如有必要，请在请求头中自行添加.
			res.setHeader('Access-Control-Allow-Origin', acao || '*');
			res.setHeader('Access-Control-Allow-Headers', 'content-type, x-requested-with');
			res.setHeader('Access-Control-Allow-Methods', 'POST,GET,DELETE,PUT');
			res.setHeader('Access-Control-Allow-Credentials', 'true');
			next();
		}).options((_req, res) => {
			res.end();
		});
	}
	// else product
	return handler;
}
