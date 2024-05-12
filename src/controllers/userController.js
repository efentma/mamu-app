import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const prisma = new PrismaClient();

export const register = async (req, res) => {
    const {nama, email, password} = req.body;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt)
    try {
           const users = await prisma.user.create({
            data: {nama: nama,
            email: email,
            password: hashedPassword
            }
        });
        res.status(200).json({message: "Register successfully", users})
    } catch (error) {
        console.log(error);
    }
}

export const login = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            where: {
                email: req.body.email
            }
        });
        const match = await bcrypt.compare(req.body.password, users[0].password);
        if (!match) {
            return res.status(400).json({error: 'Wrong password'});
        }

        const userId = users[0].id;
        const nama = users[0].nama;
        const email = users[0].email;
        const token = jwt.sign({userId, nama, email}, process.env.TOKEN_SECRET, {
            expiresIn: "50s"
        });
        res.json({token: token} )
        
    } catch (error) {
        console.log(error);
        res.status(404).json({error: 'email not found'})
    }
}