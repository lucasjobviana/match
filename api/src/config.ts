import UserModel from "./model/UserModel";
import UserService from "./service/UserService";
import UserController from "./controller/UserController";
import ImageModel from "./model/ImageModel";
import ImageService from "./service/ImageService";
import ImageController from "./controller/ImageController";
import MatchService from "./service/MatchService";
import MatchModel from "./model/MatchModel";
import NewMatchService from "./service/NewMatchService";
import NewMatchModel from "./model/NewMatchModel";
import NewMatchController from "./controller/NewMatchController";

const matchModel = new MatchModel();
const matchService = new MatchService(matchModel);

const newMatchModel = new NewMatchModel();
const newMatchService = new NewMatchService(newMatchModel);
const newMatchController = new NewMatchController(newMatchService);

const userModel = new UserModel(); 
const userService = new UserService(userModel);
const userController = new UserController(userService, matchService, newMatchService);

const imageModel = new ImageModel();
const imageService = new ImageService(imageModel);
const imageController = new ImageController(imageService);


export { userController, imageController, newMatchController }