export class Endpoints {
  // local
  public static apiV1: string = 'http://localhost:8080/sisdvac/api/v1';
  // aws
  // public static apiV1: string = 'http://sisdvac-services.us-east-1.elasticbeanstalk.com/sisdvac/api/v1';

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
  public static saveAnimalStudy: string = '/{tid}/animal-study';
  public static evaluateAnimalStudy: string = '/{tid}/advance/{aid}/animal-study/evaluate';

  // research endpoints
  public static research: string = '/research';
  public static findResearchesByUserDocumentNumber: string = '/user/document-number/{dn}';
  public static addUsers: string = '/id/{id}/add_users';
  public static findUsersByRole: string = '/{id}/users/role/{key}';
  public static findResearchUsers: string = '/{id}/users';
  public static findAnimalStudiesByUser: string = "/user/{documentNumber}/animal-studies"
  public static findClinicalStudiesByUser: string = "/user/{documentNumber}/clinical-studies"
  public static findTrialsByUserDocumentNumber: string = "/user/document-number/{documentNumber}/trials"
}
