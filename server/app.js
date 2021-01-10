const Koa = require('koa');
const serve = require('koa-static');
const Router = require('koa-router') // koa 路由中间件
const app = new Koa();



const router = new Router(); // 实例化路由

// 添加url
router.get('/hello/:name', async (ctx, next) => {
  var name = ctx.params.name; // 获取请求参数
  ctx.response.body = `<h5>Hello, ${name}!</h5>`;
});

router.get('/', async (ctx, next) => {
  ctx.response.body = '<h5>Index</h5>';
});

app.use(router.routes());

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// logger

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

// response

// app.use(async ctx => {
//   ctx.body = 'Hello World';
// });



// $ GET /package.json
// app.use(serve('.'));

// $ GET /hello.txt
app.use(serve('./www'));

app.listen(3000);