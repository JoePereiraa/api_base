import { Request, Response } from "express";

import { _UserRepository } from "@external/database/repositories/User.Repository";
import { CreateUserService, ReadAllUsersService, ReadOneUserService, UpdateUserService, DeleteUserService } from "@/core/services/user/_index";

import { UserSchema } from '@adapters/schemas/User.Schema';
import { HTTPCode } from "@/core/.shared/enums/HTTPCode";

class UserController {
    private _userConnectRepo = new _UserRepository();
    private _createUseCase: CreateUserService;
    private _readAllUseCase: ReadAllUsersService;
    private _readOneUseCase: ReadOneUserService;
    private _updateUserUseCase: UpdateUserService;
    private _deleteUserUseCase: DeleteUserService;

    constructor() {
        this._createUseCase = new CreateUserService(this._userConnectRepo);
        this._readAllUseCase = new ReadAllUsersService(this._userConnectRepo);
        this._readOneUseCase = new ReadOneUserService(this._userConnectRepo);
        this._updateUserUseCase = new UpdateUserService(this._userConnectRepo);
        this._deleteUserUseCase = new DeleteUserService(this._userConnectRepo);
    }

                // if(err instanceof Error) {
            //     return {
            //         status_code: HTTPCode.UNPROCESSABLE_ENTITY,
            //         message: err.message,
            //         errors: err instanceof Validation ? err.details : null,
            //     }
            // }

    create = async (req: Request, res: Response): Promise<void> => {
        try { 
            const { name, email, password } = UserSchema(req.body);

            const { status_code, message, errors } = await this._createUseCase.execute({
                name,
                email, 
                password
            });
    
            res.status(status_code).json({ message: message, errors: errors});
            return;
        } catch (err) {
            if(err instanceof Error) {
                res.status(HTTPCode.INTERNAL_SERVER_ERROR).json({
                    status_code: HTTPCode.INTERNAL_SERVER_ERROR,
                    errors: err
                });

                return
            }
        }
    }

    readAll = async (req: Request, res: Response): Promise<void> => {
        const { status_code, data, message } = await this._readAllUseCase.execute()
            
        res.status(status_code).json({
            data: data,
        });

        return; 
    }

    readOne = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;

        const { status_code, data, message } = await this._readOneUseCase.execute(id)
            
        res.status(status_code).json({
            data: data,
            message: message,
        });

        return; 
    }

    update = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        const { name } = req.body;

        const { status_code, data, message } = await this._updateUserUseCase.execute({id, name})
            
        res.status(status_code).json({
            data: data,
            message: message,
        });

        return; 
    }

    delete = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;

        const { status_code, message } = await this._deleteUserUseCase.execute(id)
            
        res.status(status_code).json({
            message: message,
        });

        return; 
    }
}

export {
    UserController
}