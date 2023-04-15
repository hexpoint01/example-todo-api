import Express, { Response, Request } from "express";
import { todoApp } from "../models/todo-scheme";
const router = Express();

interface TodosAdd {
    title: string,
    duty: string
}

const tdadd = router.post('/todo-add', async (req: Request, res: Response) => {
    try {
        const {
            title,
            duty
        } = req.body as TodosAdd
        console.log(title,duty)
        if (title.length <= 2 || !title)
            return res.json({ messages: 'it"s not title' })
        if (duty.length <= 2 || !duty)
            return res.json({ messages: 'it"s not duty' })
        console.log(req.body)
        const findTodo = await todoApp.findOne({ title })
        if (findTodo) return res.json({ message: 'Todo available' })
        const appends = await new todoApp({ title, duty }).save().then((object)=>{console.log(object)}).catch((err)=>{console.log(err)})
        return res.status(200).json({ message: 'Todo Append!', todo: appends })
    } catch (error) {
        res.json({ error: error })
    }
})

export {
    tdadd
}