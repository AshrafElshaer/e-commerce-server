import { Request, Response } from "express";



// POST /loging 

export const loginUser = (req: Request, res:Response)=>{
    res.send('login user')
}

// POST /register
export const registerUser = (req: Request, res:Response)=>{
    res.send('register user')
}