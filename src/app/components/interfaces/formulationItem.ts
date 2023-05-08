import {FormulationItemTypeEnum} from "../enums/formulationItemTypeEnum";

export interface FormulationItem {
  type: FormulationItemTypeEnum;
  detail: string;
}
