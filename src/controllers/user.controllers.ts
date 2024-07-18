import { RequestHandler } from "express";
import { UserModel } from "../models/user";

export const allUsers: RequestHandler =  (req, res) => {
    try {
        const user =  UserModel.find();
        res.status(201).json(user);
    } catch (error) { console.error(error) }
}

export const getUserByEmail = async (email:string) => await UserModel.findOne({ email });

export const getUserBySessionToken = async (sessionToken: string) => await UserModel.findOne({
    'authentication.sessionToken': sessionToken
});

export const getUserById = async(id: string) => await UserModel.findById(id);

export const createUser = (values: Record<string, any>) => new UserModel(values).save()
.then((user:any) => user.toObject());

export const deleteUserById = (id: string) => UserModel.findByIdAndDelete(id);

export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);
