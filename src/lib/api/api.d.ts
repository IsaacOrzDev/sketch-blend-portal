/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/": {
    get: operations["AppController_healthCheck"];
  };
  "/test": {
    get: operations["AppController_getTesting"];
  };
  "/auth/google/authenticate": {
    post: operations["AuthController_authenticateGoogleUser"];
  };
  "/auth/github/authenticate": {
    post: operations["AuthController_authenticateGithubUser"];
  };
  "/auth/password-less/send-email": {
    post: operations["AuthController_sendEmailForPasswordLess"];
  };
  "/auth/password-less/generate": {
    post: operations["AuthController_generatePasswordLessToken"];
  };
  "/auth/password-less/authenticate": {
    post: operations["AuthController_AuthenticatePasswordLessLogin"];
  };
  "/auth/access-token/generate": {
    post: operations["AuthController_generateAccessToken"];
  };
  "/auth/access-token/verify": {
    post: operations["AuthController_verifyAccessToken"];
  };
  "/users": {
    get: operations["UserController_findAllUsers"];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    AuthenticateGithubUserDto: {
      code: string;
    };
    AuthenticateResponse: {
      /** @default true */
      success: boolean;
      /** Format: date-time */
      expiredAt: string;
      token: string;
      isFirstTime: boolean;
    };
    ErrorResponse: {
      statusCode: number;
      message: string[];
    };
    SendEmailForPasswordLessDto: {
      email: string;
    };
    AddOneTimeTokenDto: {
      username: string | null;
      email: string;
    };
    VerifyTokenDto: {
      token: string;
    };
    VerifyTokenResponse: {
      userId: string;
      username: string;
      email: string | null;
      imageUrl: string | null;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export interface operations {

  AppController_healthCheck: {
    responses: {
      200: {
        content: never;
      };
    };
  };
  AppController_getTesting: {
    responses: {
      200: {
        content: never;
      };
    };
  };
  AuthController_authenticateGoogleUser: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["AuthenticateGithubUserDto"];
      };
    };
    responses: {
      /** @description Authenticate with Google */
      201: {
        content: {
          "application/json": components["schemas"]["AuthenticateResponse"];
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description Cannot authenticate with Google */
      500: {
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  AuthController_authenticateGithubUser: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["AuthenticateGithubUserDto"];
      };
    };
    responses: {
      /** @description Authenticate with Github */
      201: {
        content: {
          "application/json": components["schemas"]["AuthenticateResponse"];
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description Cannot authenticate with Github */
      500: {
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  AuthController_sendEmailForPasswordLess: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["SendEmailForPasswordLessDto"];
      };
    };
    responses: {
      201: {
        content: never;
      };
    };
  };
  AuthController_generatePasswordLessToken: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["AddOneTimeTokenDto"];
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"];
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description Internal Server Error */
      500: {
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  AuthController_AuthenticatePasswordLessLogin: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["VerifyTokenDto"];
      };
    };
    responses: {
      /** @description Authenticate with Email */
      201: {
        content: {
          "application/json": components["schemas"]["AuthenticateResponse"];
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description Cannot authenticate with Email */
      500: {
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  AuthController_generateAccessToken: {
    responses: {
      201: {
        content: never;
      };
    };
  };
  AuthController_verifyAccessToken: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["VerifyTokenDto"];
      };
    };
    responses: {
      201: {
        content: {
          "application/json": components["schemas"]["VerifyTokenResponse"];
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description Internal Server Error */
      500: {
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  UserController_findAllUsers: {
    responses: {
      200: {
        content: never;
      };
    };
  };
}
