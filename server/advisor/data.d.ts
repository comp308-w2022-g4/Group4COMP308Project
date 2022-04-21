const dataFieldSex: { M: 0; F: 1 };
export type DataFieldSex = keyof typeof dataFieldSex;
export type DataFieldRawSex<S extends DataFieldSex = DataFieldSex> =
  typeof dataFieldSex[S];

const dataFieldLevel: { No: 0; Some: 1; Yes: 2; Severe: 3 };
export type DataFieldLevel = keyof typeof dataFieldLevel;
export type DataFieldRawLevel<L extends DataFieldLevel = DataFieldLevel> =
  typeof dataFieldLevel[L];

type DataFieldRawBoolean<V extends boolean = boolean> = V extends true ? 1 : 0;

export interface DataEntry {
  /** Age of the patient */
  age: number;

  /** Sex of the patient, either "M" or "F" */
  sex: DataFieldSex;

  /** Whether the patient has chest pains */
  chestPain: DataFieldLevel;

  /** Whether value of fasting blood sugar is over 120 mg/dl */
  fastingBloodSugar: boolean;

  /**
   * Whther the patient experiences angina after exercising
   *
   * (angina: a chest pain, usually due to insufficient blood to heart muscle)
   */
  exerciseAngina: boolean;

  /** Blood pressure while resting (unit: `mmHg`) */
  restingBloodPressure: number;

  /** Cholesterol (unit: `mg/dl`) */
  cholesterol: number;

  /** Maximum heart rate */
  maxHeartRate: number;
}

type RawTypeMapper<T extends Record<string, any>> = {
  [P in keyof T]: T[P] extends boolean
    ? DataFieldRawBoolean
    : T[P] extends DataFieldSex
    ? DataFieldRawSex<T[P]>
    : T[P] extends DataFieldLevel
    ? DataFieldRawLevel<T[P]>
    : T[P];
};

export type RawDataEntry = RawTypeMapper<DataEntry>;

export interface TrainingDataEntry extends RawDataEntry {
  target: DataFieldRawBoolean;
}
