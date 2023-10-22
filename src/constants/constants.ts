// eslint-disable-next-line import/no-anonymous-default-export
export default {
  COMPANY_NAME: 'Ananya',
  CLASS_NAMES: {
    BRAND_CLASS: 'chit'
  },
  ACTION_BTN: {
    EDIT: 'Edit',
    DELETE: 'Delete',
    CREATE: 'Create'
  },
  SESSION_STORAGE: {
    ROLE_KEY: 'currentUserRole',
    USER_ID_KEY: 'currentUserId',
    NAME_KEY: 'currentUserName',
    AUTH_TOKEN_KEY: 'currentUserAuthToken',
    IS_FIRST_LOGIN: 'isFirstLogin',
    CURRENT_ORG_ID: 'currentOrgId',
    CURRENT_MANAGE_CUSTOMER_ID: 'current_manage_customer_id',
    LOGO: 'org_logo'
  },
  STATUS_CODE: {
    STATUS_200: 200,
    STATUS_204: 204,
    STATUS_400: 400,
    STATUS_401: 401,
    STATUS_403: 403,
    STATUS_409: 409,
    STATUS_500: 500,
    STATUS_404: 404
  },
  ROLE: {
    SUPER_ADMIN: 'Super Admin',
    SUPER_ID: 1,
    ORG_ADMIN: 'Org Admin',
    ORG_ID: 2,
    ADMIN: 'Admin',
    ADMIN_ID: 3,
    EMPLOYEE: 'EMPLOYEE',
    EMPLOYEE_ID: 4
  },
  TOAST_DEFAULTS: {
    TIMEOUT: 6000,
    POSITION: 'topRight',
    DISPLAY_MODE: 1,
    INFO_TITLE: 'Info',
    SUCCESS_TITLE: 'Success',
  },
  PINCODE_PATTERN: /^[6]{1}[0-9]{2}\s{0,1}[0-9]{3}$/,
  PHONE_PATTERN: /^[6-9]\d{9}$/,
  EMAIL_PATTERN: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  PASSWORD_PATTERN: /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{12,}$/m,
  ERROR: {
    USER: {
      PINCODE: 'Please enter a valid pincode',
      PHONE: 'Please enter a valid phone number',
      EMAIL_VALIDATION: 'Please enter a valid email address',
      PASSWORD_VALIDATION: 'Password must be more than 12 characters and contain an uppercase, lowercase letter with a number and special character'
    }
  } 
}