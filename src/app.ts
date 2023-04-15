import Express, { NextFunction, Response, Request } from "express";
const logger = require('morgan');
import path from "path";
import { tdadd } from "./routes/todos-add";
import { todorep } from "./routes/todos-rep";
import { delltodo } from "./routes/todos-dell"
const app = Express();


// jsn st
app.set('json', true)

// burada app use olarak özellikleri veriyorum
app.use(logger('dev'))
app.use(Express.json())
app.use(Express.urlencoded({ extended: true }))
app.use(Express.static(path.join(__dirname, 'src')))
app.use(tdadd)
app.use(todorep)
app.use(delltodo)
/**/
app.get('/', (req: Request, res: Response) => {
    res.status(200).send({ message: 'Active' })
})
//404 found
app.use(function (req: Request, res: Response, next: NextFunction) {
    try {
        res.status(404).send({ message: '404 Page' })

    } catch (error) {
        console.log('Erorr', error)
    }
})



app.listen(3000)