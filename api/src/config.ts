import UserModel from "./model/UserModel";
import UserService from "./service/UserService";
import UserController from "./controller/UserController";

const userModel = new UserModel(); 
const userService = new UserService(userModel);
const userController = new UserController(userService);

export { userController }