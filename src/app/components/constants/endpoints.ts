export class Endpoints {
  // base host
  public static apiV1: string = 'http://localhost:8080/sisdvac/api/v1';

  //auth endpoints
  public static authenticate: string = '/auth/authenticate';

  // user endpoints
  public static user: string = '/user';
  public static usersByRole: string = '/role/';
  public static usersByDocumentNumber: string = '/document_number/';
  public static usersByName: string = '/name/';

  // trial endpoints
  public static trial: string = '/trial';
  public static addFormulation: string = '/{id}/formulation';
  public static evaluateFormulation: string = '/{tid}/formulation/{fid}/evaluate';
  public static findFormulationEvaluationById: string = '/{tid}/formulation/{fid}';

  // research endpoints
  public static research: string = '/research';
  public static addUsers: string = '/id/{id}/add_users';
  public static findUsersByRole: string = '/{id}/users/role/{key}';
}
