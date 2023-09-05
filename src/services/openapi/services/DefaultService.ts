/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { VerifyGoogleIdTokenDto } from '../models/VerifyGoogleIdTokenDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DefaultService {

    /**
     * @returns any
     * @throws ApiError
     */
    public static appControllerGetTesting(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/',
        });
    }

    /**
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static authControllerVerifyGoogleIdToken(
        requestBody: VerifyGoogleIdTokenDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/google/verify',
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
