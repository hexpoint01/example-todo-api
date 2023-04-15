import Express, { Request, Response } from "express";
import { todoApp } from "../models/todo-scheme";
const router = Express();

interface TodoDell {
    title: string
}

const delltodo = router.delete('/todo-dell', async (req: Request, res: Response) => {
    try {
        const {
            title
        } = req.body as TodoDell
        console.log(title)
        if (!title || title.length <= 1)
            return res.json({ message: 'title is not found or low character' })
        const tdremove = await todoApp.findOne({ title })
        if (tdremove)
            tdremove.deleteOne()
                .then(() => { return res.json({ message: 'Clear' }) })
                .catch((err) => { return res.json({ errror: err }) })
    }
    catch (error) {
        return res.json({ err: error })
    }
})
export {
    delltodo
}