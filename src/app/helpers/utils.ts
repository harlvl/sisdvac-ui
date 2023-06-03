import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {RoleEnum} from "../components/enums/roleEnum";
import {Role} from "../components/constants/role";
import {TrialStageEnum} from "../components/enums/trialStageEnum";
import {TrialStage} from "../components/constants/trial-stage";
import {AnimalModelEnum} from "../components/enums/animalModelEnum";

@Injectable()
export class Utils {
  constructor(private router: Router) {

  }

  public static getErrorMessage(input: any) {

  }

  public static getAnimalModelName(input: any) {
    switch (input) {
      case AnimalModelEnum.MICRO:
        return 'Microorganismo';
      case AnimalModelEnum.BIRD:
        return 'Ave';
      case AnimalModelEnum.HUMAN:
        return 'Humano';
      case AnimalModelEnum.PRIMATE:
        return 'Primate';
      case AnimalModelEnum.RODENT:
        return 'Roedor';
      default:
        return "Sin modelo definido";
    }
  }

  public static getRoleName(role: any) {
    switch (role) {
      case RoleEnum.DOCTOR_MAIN:
        return Role.doctor_main;
      case RoleEnum.DOCTOR_MEMBER:
        return Role.doctor_member;
      case RoleEnum.SPONSOR:
        return Role.sponsor;
      case RoleEnum.ASSISTANT:
        return Role.assistant;
      case RoleEnum.ADMIN:
        return Role.admin;
      default:
        return "Sin rol definido";
    }
  }

  public static getTrialStage(input: any) {
    switch (input) {
      case TrialStageEnum.PRECLINICAL:
        return TrialStage.preclinical;
      case TrialStageEnum.CLINICAL:
        return TrialStage.clinical;
      default:
        return "Sin etapa definida";
    }
  }

  public getResponse(res:any) {
    let response = res
  }
}
