import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./route";


/**
 * / route
 *
 * @class User
 */
export class UserRoute extends BaseRoute {

  /**
   * Create the routes.
   *
   * @class UserRoute
   * @method create
   * @static
   */
  public static create(router: Router) {
    //log
    console.log("[UserRoute::create] Creating user route.");

    //add home page route
    router.get("/users", (req: Request, res: Response, next: NextFunction) => {
      new UserRoute().users(req, res, next);
    });
  }

  /**
   * Constructor
   *
   * @class UserRoute
   * @constructor
   */
  constructor() {
    super();
  }

  /**
   * The user page route.
   *
   * @class UserRoute
   * @method users
   * @param req {Request} The express Request object.
   * @param res {Response} The express Response object.
   * @next {NextFunction} Execute the next method.
   */
  public users(req: Request, res: Response, next: NextFunction) {
    //set custom title
    this.title = "User | CS591";

    //set options
    let options: Object = {
      "message": "User Page"
    };

    //render template
    this.render(req, res, "users", options);
  }
}

