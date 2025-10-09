import { signInSchema, signUpSchema } from "../types";
import { AppDataSource } from "../database/appDataSource";
import jwt from "jsonwebtoken";
import { Router } from 'express';
import bcrypt from "bcrypt";
import { User } from "../entities/user.entity";
const router = Router();

const userRepository = AppDataSource.getRepository(User);

router.post("/sign-up", async (req, res) => {
    const { data, success } = signUpSchema.safeParse(req.body);
    if (!success && !data) {
        res.status(411).json({
            success: false,
            data: null,
            message: "Incorrect input parameters"
        })
        return
    }
    const existingUser = await userRepository.findOne({
        where: {
            email: data.email
        }
    })

    if (existingUser) {
        res.status(409)
            .json({
                success: false,
                data: null,
                message: "Account already exists"
            })
        return
    }

    const hashPassword = await bcrypt.hash(data.password, 10);
    const user = userRepository.create({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: hashPassword
    })
    await userRepository.save(user);
    res.status(200)
        .json({
            success: true,
            data: null,
            message: "User saved successfully"
        })
})

router.post("/sign-in", async (req, res) => {
    const { data, success } = signInSchema.safeParse(req.body);
    if (!success && !data) {
        res.status(411).json({
            success: false,
            data: null,
            message: "Incorrect input parameters"
        })
        return
    }

    const user = await userRepository.findOne({
        where: {
            email: data.email
        }
    })
    if (!user) {
        res.status(411).json({
            success: false,
            data: null,
            message: "user doesn't exist"
        })
        return;
    }
    const isPasswordVaild = await bcrypt.compare(data.password, user?.password);
    if (!isPasswordVaild) {
        res.status(401).json({
            success: false,
            data: null,
            message: "email or password are incorrect"
        })
    }
    const token = jwt.sign({
        email: user.email,
        userId: user.id
    }, process.env.AUTH_JWT_SECRET!);

    res.status(200).json({
        success: true,
        data: token,
        message: "Sign in successfully",

    })
})

export default router;