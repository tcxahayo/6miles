import { Request, Response } from 'express';

function getFakeCaptcha(req: Request, res: Response) {
  return res.json('captcha-xxx');
}
// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
  // 支持值为 Object 和 Array
  'GET /api/user/info': {
    avatar: 'http://182.92.210.231:81/default.png',
    nickname: 'tcx',
    phone: '13880273668',
    email: null,
  },
  // GET POST 可省略
  'GET /api/users': {
    status: 200,
    msg: '查询成功',
    data: {
      size: 2,
      page: 1,
      totalSize: 3,
      totalPage: 2,
      list: [
        {
          id: '14a04108430e96beb1d6e98fb0658923',
          createDate: '2020-03-07 20:16:35',
          updateDate: '2020-03-07 20:16:35',
          reserve1: null,
          reserve2: null,
          phone: '13880273668',
          email: null,
          password: 'cf4740aab5f543579351bc8051b25acc',
          salt: 'U($v746QM9D_G/cRI]CNFxd7PAbHbg',
          avatar: 'http://182.92.210.231:81/default.png',
          nickname: 'tcx',
          type: 2,
          longitude: null,
          latitude: null,
          remake: null,
        },
        {
          id: '2b4cb8858b1ed2b0686936a585b9f448',
          createDate: '2020-03-10 20:54:54',
          updateDate: '2020-03-10 20:54:54',
          reserve1: null,
          reserve2: null,
          phone: '13111111111',
          email: null,
          password: 'c17562714292afb71ff036fcbe36df46',
          salt: '(4z!,uDDxypt&?1XJQ?8IoO]%w|*%>',
          avatar: 'http://182.92.210.231:81/default.png',
          nickname: '不高兴和没头脑',
          type: 1,
          longitude: null,
          latitude: null,
          remake: null,
        },
      ],
    },
  },
  'POST /api/login': (req: Request, res: Response) => {
    const { password, phone, type } = req.body;
    if (password === '123456' && phone === '13880273668' && type === 2) {
      res.send({
        status: 'ok',
        type,
      });
      return;
    }

    res.send({
      status: 'error',
      type,
    });
  },
  'POST /api/register': (req: Request, res: Response) => {
    res.send({ status: 'ok', currentAuthority: 'user' });
  },
  'GET /api/500': (req: Request, res: Response) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req: Request, res: Response) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req: Request, res: Response) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req: Request, res: Response) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },

  'GET  /api/login/captcha': getFakeCaptcha,
};
