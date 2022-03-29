import { BaseServices } from './BaseServices';

export class UserServices extends BaseServices {
    constructor() {
        super();
    }

    signUp = (userSignUpInfo) => {

        return this.post('Users/signup', userSignUpInfo);
    }

    login = (userLogin) => {
        return this.post('Users/signin', userLogin);
    }

    getListUser = (search) => {
        return this.get(`Users/getUser?keyword=${search}`);
    }

    editUser = (updatedUser) => {
        return this.put('Users/editUser', updatedUser);
    }

    deleteUser = (userId) => {
        return this.delete(`Users/deleteUser?id=${userId}`);
    }

}

export const userServices = new UserServices();