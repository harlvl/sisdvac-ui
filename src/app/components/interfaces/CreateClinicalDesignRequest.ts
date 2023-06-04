export interface CreateClinicalDesignRequest {
  objectives: string;
  phase: Number;
  sampleSize: Number;
  ethicalGuide: string;
  ethicalGuideUri: string;
  animalModel: string;
}
