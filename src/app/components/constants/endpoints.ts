export class Endpoints {
  // base host
  public static apiV1: string = 'http://localhost:8080/sisdvac/api/v1';

  //auth endpoints
  public static authenticate: string = '/auth/authenticate';

  // user endpoints
  public static user: string = '/user';
  public static userByRole: string = '/role/';

  // trial endpoints
  public static trial: string = '/trial';

  // research endpoints
  public static research: string = '/research';
  public static findUsersByRole: string = '/{id}/users/role/{key}';
}
