const RESPONSE = {
    CREATED: 201,
    OK : 200,
    NOT_FOUND : 404,
    UPDATED : 204,
    DELETED : 202,
    BAD_REQUEST : 400,
    UNAUTHORIZED : 401,

    SUCCESS: true,
    FAILURE: false,

    CREATE_MESSAGE: 'Product Created',
    DATA_NOT_FOUND : 'Data Not Found',
    ALL_FIELDS_REQUIRED : 'All Fields Required',
    INTERNAL_SERVER_ERROR : 'Internal Server Error',
    UPDATE_PRODUCT : 'Product Updated',
    DELETE_PRODUCT : 'Deleted Product',
    BAD_REQUEST_MESSAGE : 'Bad Request',

    ALREADY_EXISTS : 'Already Exists User',
    REGISTER_USER : 'Register User',
    USER_NOT_REGISTERED : 'User Not Registered',
    LOGIN_SUCCESS : 'Login Successful',
    PASSWORD_NOT_MATCH: 'Password Not Match',
    FORBIDDEN_USER : 'Forbidden User',




}

module.exports = RESPONSE;