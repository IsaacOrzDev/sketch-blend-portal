/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SendEmailForPasswordLessDto } from '../models/SendEmailForPasswordLessDto';
import type { verifyPasswordLessToken } from '../models/verifyPasswordLessToken';
import type { VerifyTokenDto } from '../models/VerifyTokenDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AuthService {

    /**
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static authControllerVerifyGoogleIdToken(
        requestBody: VerifyTokenDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/google/verify',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static authControllerVerifyGithubAccessToken(
        requestBody: VerifyTokenDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/github/verify',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static authControllerSendEmailForPasswordLess(
        requestBody: SendEmailForPasswordLessDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/password-less/send-email',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static authControllerVerifyPasswordLessToken(
        requestBody: verifyPasswordLessToken,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/password-less/verify',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns any
     * @throws ApiError
     */
    public static authControllerGenerateAccessToken(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/access-token/generate',
        });
    }

}
