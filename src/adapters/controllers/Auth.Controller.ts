import { Request, Response } from "express";

import { _UserRepository } from "@/external/database/repositories/User.Repository";
import { LoginService } from "@/core/services/auth/Login";
import { LogOutService } from "@/core/services/auth/Logout";
import { MeService } from "@/core/services/auth/Me";

import jwt from "jsonwebtoken";
import { env } from "@/_env/env";

class AuthController {
    private _userConnectRepo = new _UserRepository();
    private _loginUseCase: LoginService;
    private _logoutUseCase: LogOutService;
    private _meUseCase: MeService;

    constructor() {
        this._loginUseCase = new LoginService(this._userConnectRepo);
        this._logoutUseCase = new LogOutService(this._userConnectRepo);
        this._meUseCase = new MeService(this._userConnectRepo);
    }

    login = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const token = req.cookies.auth_token;

        const { status_code, data, message, errors } = await this._loginUseCase.execute({ email, password, tokenRecieved: token });

        if(data) {
            res.cookie('auth_token', data, {
                maxAge: 3600 * 1000, // 1 hora
                httpOnly: true,
                sameSite: 'strict',
                path: '/'
            });
        }

        res.status(status_code).json({ message, errors })
        return;
    }

    logout = async (req: Request, res: Response) => {
        const token = req.cookies.auth_token;
        let decoded: { id: string | null } = { id: null }; 

        if(token != "") {
            decoded = jwt.verify(token, env.JWT_SECRET) as { id: string | null }
        }

        const { status_code, message } = await this._logoutUseCase.execute(decoded!?.id);

        res.clearCookie("auth_token", {
            httpOnly: true,
            sameSite: "strict",
            path: '/'
        })

        res.status(status_code).json({ message });
    }

    me = async (req: Request, res: Response) => {
        const token = req.cookies.auth_token;

        let decoded: { id: string | null } = { id: null }; 

        if(token != "") {
            decoded = jwt.verify(token, env.JWT_SECRET) as { id: string | null }
        }

        const { status_code, data, message } = await this._meUseCase.execute(decoded!?.id);

        res.status(status_code).json({ data, message });
    }
}

export {
    AuthController
}