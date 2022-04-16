export default class ApiError extends Error {
    constructor (message, errors = []) {
        super()
        this.message = message
        this.errors = errors
    }

    static UnauthorizedError () {
        return new ApiError('UNAUTHORIZED')
    }

    static UnauthorizedErrorL2 () {
        return new ApiError('UNAUTHORIZED-2')
    }

    static BadRequest (message, errors = []) {
        return new ApiError(message, errors)
    }

    static PermissionError () {
        return new ApiError('Permission Denied')
    }

    static NotFound () {
        return new ApiError('Not found')
    }
}
