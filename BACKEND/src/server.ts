import express,{Application} from 'express'
import { configureExpress } from './config/express';
import userRouter from './webServer/routes/userRoutes';


const app:Application = express()
const port = 3000;

configureExpress(app);
app.use(userRouter)


app.listen(port,() => {
    console.log(`Backend app listening at http://localhost:${port}`)
})