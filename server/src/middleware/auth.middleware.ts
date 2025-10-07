import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token)
        return res.status(400).json({
            data: null,
            message: null,
            error: "token doesn't exist"
        })
    const user: any = jwt.verify(token, process.env.AUTH_JWT_SECRET!);
    (req as any).userId = user.userId;
    next();
}

export default AuthMiddleware;