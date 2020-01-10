export class ApiConfig {
  static BASE_URL = 'http://localhost:3004/';

  static AUTH_BASE_URL = `${ApiConfig.BASE_URL}auth/`;
  static LOGIN_URL = `${ApiConfig.AUTH_BASE_URL}login/`;
  static USER_INFO_URL = `${ApiConfig.AUTH_BASE_URL}userinfo/`;

  static COURSES_BASE_URL = `${ApiConfig.BASE_URL}courses/`;
  static AUTHORS_BASE_URL = `${ApiConfig.BASE_URL}authors/`;

}
