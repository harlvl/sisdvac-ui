import {TrialStatus} from "./trialStatus";
import {Tpp} from "./tpp";
import {Formulation} from "./formulation";

export interface Trial {
  title: string;
  insNumber: string;
  stage: string;
  phase: string;
  startDate: string;
  status: TrialStatus;
  tpp: Tpp;
  formulation: Formulation;
  endDate: string;
  advances: any;
}
