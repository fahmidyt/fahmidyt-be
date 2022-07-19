/**
 * OK Status Code
 * @summary OK
 * @description Standard response for successful HTTP requests. The actual response will depend on the request method used. In a GET request, the response will contain an entity corresponding to the requested resource. In a POST request, the response will contain an entity describing or containing the result of the action.
 */
export const OK: number = 200

/**
 * Created Status Code
 * @summary Created
 * @description The request has been fulfilled, resulting in the creation of a new resource.
 */
export const CREATED: number = 201

/**
 * Bad Request Status Code
 * @summary Bad Request
 * @description The server cannot or will not process the request due to an apparent client error.
 */
export const BAD_REQUEST: number = 400

/**
 * Unauthorized Status Code
 * @summary Unauthorized
 * @description Use when authentication is required and has failed or has not yet been provided. The user does not have valid authentication credentials for the target resource.
 */
export const UNAUTHORIZED: number = 401

/**
 * Forbidden Status Code
 * @summary Forbidden
 * @description The request contained valid data and was understood by the server, but the server is refusing action.
 */
export const FORBIDDEN: number = 403

/**
 * Not Found Status Code
 * @summary Not Found
 * @description The requested resource could not be found but may be available in the future. Subsequent requests by the client are permissible.
 */
export const NOT_FOUND: number = 404

/**
 * Internal Server Error Status Code
 * @summary Internal Server Error
 * @description A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.
 */
export const INTERNAL_SERVER_ERROR: number = 500
