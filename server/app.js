const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const db = require('./db');
const router = require('./routers/index');
const app = new Koa();

app.use(bodyParser());
app.use(router.routes());
app.listen(3005);
db.init();

console.log('app started at port 3005...');