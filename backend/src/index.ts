import express from 'express'
import routes from './routes'

var cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
app.use(routes);

const server = app.listen(8080, '0.0.0.0', () =>
    console.log(`
🚀 Server ready at: https://this.ip.i.dk:8080
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`),
)