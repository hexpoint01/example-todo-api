import Express, { Response, Request } from "express";
import { todoApp } from "../models/todo-scheme";
const router = Express();

interface TodoReplace {
    title: string,
    newtitle: string,
    newduty: string
}

const todorep = router.put('/todo-rep', async (req: Request, res: Response) => {
    try {
        const {
            title,
            newtitle,
            newduty
        } = req.body as TodoReplace
        if (title.length <= 2 || !title)
            return res.json({ message: 'it"s not title' })
        if (!req.body.newtitle || req.body.newtitle.length == null)
            return res.json({ message: 'please enter newtitle' })
        if (!req.body.newduty || req.body.newduty.length == null)
            return res.json({ message: 'please enter newduty' })
        if (!req.body.title || !req.body.newtitle || !req.body.newduty)
            return res.json({ message: 'Rule Error' })
        const todo_CT = await todoApp.findOne({ title })
        if (!todo_CT)
            return res.json({ message: 'Todo not find' })
        const todo_Replace = await todoApp.findOneAndUpdate(
            { title },
            { title: newtitle, duty: newduty },
            { new: true }
        )
            .then((obj) => {
                console.log('Todo Update ', obj)
            })
            .catch((err) => {
                console.log(err)
            })
        res.status(200).json({ message: 'Success', todo: todo_Replace })
    }
    catch (error) {
        res.json({ message: error })
    }
})
export {
    todorep
}