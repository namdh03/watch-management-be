export const SERVER_MESSAGES = {
  VALIDATION_ERROR: 'Validation error',
  BAD_REQUEST: 'Bad request',
  PAGE_NOT_FOUND: 'Page not found',
  INTERNAL_SERVER_ERROR: 'Internal server error',
  UNAUTHORIZED: 'Unauthorized',
  FORBIDDEN: 'Forbidden',
  LIMIT_MUST_BE_A_NUMBER_BETWEEN_1_AND_100: 'Limit must be a number between 1 and 100',
  PAGE_MUST_BE_A_NUMBER_GREATER_THAN_0: 'Page must be a number greater than 0'
}

export const BRAND_MESSAGES = {
  BRAND_ID_IS_REQUIRED: 'Brand id is required',
  BRAND_ID_MUST_BE_A_STRING: 'Brand id must be a string',
  BRAND_NAME_IS_REQUIRED: 'Brand name is required',
  BRAND_NAME_MUST_BE_A_STRING: 'Brand name must be a string',
  BRAND_NAME_LENGTH_MUST_BE_BETWEEN_1_AND_50: 'Brand name length must be between 1 and 50',
  BRAND_NAME_ALREADY_EXISTS: 'Brand name already exists',
  BRAND_NAME_DOES_NOT_EXIST: 'Brand name does not exist',
  CREATE_BRAND_SUCCESSFULLY: 'Create brand successfully',
  UPDATE_BRAND_SUCCESSFULLY: 'Update brand successfully',
  DELETE_BRAND_SUCCESSFULLY: 'Delete brand successfully',
  BRAND_ID_MUST_BE_A_VALID_ID: 'Brand id must be a valid id',
  BRAND_ID_DOES_NOT_EXIST: 'Brand id does not exist',
  CAN_NOT_DELETE_USED_BRAND: 'Can not delete used brand',
  GET_BRANDS_SUCCESS: 'Get brands successfully',
  CREATE_BRAND_SUCCESS: 'Create brand successfully',
  GET_BRAND_SUCCESS: 'Get brand successfully',
  UPDATE_BRAND_SUCCESS: 'Update brand successfully',
  DELETE_BRAND_SUCCESS: 'Delete brand successfully'
}

export const WATCH_MESSAGES = {
  WATCH_NAME_IS_REQUIRED: 'Watch name is required',
  WATCH_NAME_MUST_BE_A_STRING: 'Watch name must be a string',
  WATCH_NAME_LENGTH_MUST_BE_BETWEEN_1_AND_100: 'Watch name length must be between 1 and 100',
  IMAGE_MUST_BE_A_URL: 'Image must be a URL',
  IMAGE_MUST_BE_A_STRING: 'Image must be a string',
  IMAGE_LENGTH_MUST_BE_BETWEEN_1_AND_255: 'Image length must be between 1 and 255',
  PRICE_MUST_BE_A_NUMBER: 'Price must be a number',
  PRICE_MUST_BE_MORE_THAN_1_AND_LESS_THAN_1000000000: 'Price must be more than 1 and less than 1000000000',
  AUTOMATIC_MUST_BE_A_BOOLEAN: 'Automatic must be a boolean',
  WATCH_DESCRIPTION_MUST_BE_A_STRING: 'Watch description must be a string',
  WATCH_DESCRIPTION_LENGTH_MUST_BE_BETWEEN_1_AND_500: 'Watch description length must be between 1 and 500',
  WATCH_ID_MUST_BE_A_VALID_ID: 'Watch id must be a valid id',
  WATCH_ID_DOES_NOT_EXIST: 'Watch id does not exist',
  CREATE_WATCH_SUCCESSFULLY: 'Create watch successfully',
  UPDATE_WATCH_SUCCESSFULLY: 'Update watch successfully',
  WATCH_ALREADY_COMMENTED: 'Watch already commented',
  WATCH_ID_IS_REQUIRED: 'Watch id is required',
  WATCH_ID_MUST_BE_A_STRING: 'Watch id must be a string',
  DELETE_WATCH_SUCCESSFULLY: 'Delete watch successfully',
  GET_WATCHES_SUCCESSFULLY: 'Get watches successfully',
  GET_WATCH_SUCCESSFULLY: 'Get watch successfully'
}

export const USER_MESSAGES = {
  MEMBER_NAME_IS_REQUIRED: 'Member name is required',
  MEMBER_NAME_MUST_BE_A_STRING: 'Member name must be a string',
  MEMBER_NAME_LENGTH_MUST_BE_BETWEEN_1_AND_20: 'Member name length must be between 1 and 20',
  PASSWORD_IS_REQUIRED: 'Password is required',
  PASSWORD_MUST_BE_A_STRING: 'Password must be a string',
  PASSWORD_LENGTH_MUST_BE_BETWEEN_6_AND_50: 'Password length must be between 6 and 50',
  PASSWORD_MUST_BE_STRONG:
    'Password must be strong, must contain at least 6 characters, 1 lowercase letter, 1 uppercase letter, 1 number and 1 symbol',
  MEMBER_NAME_ALREADY_EXISTS: 'Member name already exists',
  ACCESS_TOKEN_IS_REQUIRED: 'Access token is required',
  MEMBER_NAME_OR_PASSWORD_IS_INCORRECT: 'Username or password is incorrect',
  USER_NOT_FOUND: 'User not found',
  MEMBER_NAME_MUST_NOT_CONTAIN_SPACES: 'Member name must not contain spaces',
  CONFIRM_PASSWORD_IS_REQUIRED: 'Confirm password is required',
  CONFIRM_PASSWORD_MUST_BE_A_STRING: 'Confirm password must be a string',
  CONFIRM_PASSWORD_LENGTH_MUST_BE_BETWEEN_6_AND_50: 'Confirm password length must be between 6 and 50',
  CONFIRM_PASSWORD_MUST_BE_STRONG:
    'Confirm password must be strong, must contain at least 6 characters, 1 lowercase letter, 1 uppercase letter, 1 number and 1 symbol',
  PASSWORDS_DO_NOT_MATCH: 'Passwords do not match',
  CURRENT_PASSWORD_IS_INCORRECT: 'Current password is incorrect',
  UPDATE_PROFILE_SUCCESS: 'Update profile successfully',
  CHANGE_PASSWORD_SUCCESS: 'Change password successfully',
  REFRESH_TOKEN_IS_REQUIRED: 'Refresh token is required',
  NAME_IS_REQUIRED: 'Name is required',
  NAME_MUST_BE_A_STRING: 'Name must be a string',
  NAME_LENGTH_MUST_BE_BETWEEN_1_AND_50: 'Name length must be between 1 and 50',
  YEAR_OF_BIRTH_MUST_BE_AN_INTEGER_BETWEEN_1900_AND_CURRENT_YEAR:
    'Year of birth must be an integer between 1900 and current year',
  SIGN_IN_SUCCESS: 'Sign in successfully',
  SIGN_UP_SUCCESS: 'Sign up successfully',
  REFRESH_TOKEN_MUST_BE_A_STRING: 'Refresh token must be a string',
  REFRESH_TOKEN_HAS_BEEN_USED_OR_NOT_EXIST: 'Refresh token has been used or does not exist',
  SIGN_OUT_SUCCESS: 'Sign out successfully',
  GET_ME_SUCCESS: 'Get me successfully',
  UPDATE_ME_SUCCESS: 'Update me successfully',
  GET_USERS_SUCCESS: 'Get users successfully',
  REFRESH_TOKEN_SUCCESS: 'Refresh token successfully'
}

export const COMMENT_MESSAGES = {
  RATING_IS_REQUIRED: 'Rating is required',
  RATING_MUST_BE_A_NUMBER: 'Rating must be a number',
  RATING_MUST_BE_A_NUMBER_BETWEEN_1_AND_3: 'Rating must be a number between 1 and 3',
  WATCH_CONTENT_LENGTH_MUST_BE_BETWEEN_1_AND_500: 'Watch content length must be between 1 and 500',
  COMMENT_DOES_NOT_EXIST: 'Comment does not exist',
  COMMENT_SUCCESSFULLY: 'Comment successfully',
  DELETE_COMMENT_SUCCESSFULLY: 'Delete comment successfully',
  COMMENT_ID_IS_REQUIRED: 'Comment id is required',
  COMMENT_ID_MUST_BE_A_STRING: 'Comment id must be a string',
  COMMENT_ID_MUST_BE_A_VALID_ID: 'Comment id must be a valid id'
}
