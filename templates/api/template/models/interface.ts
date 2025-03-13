import { Document } from 'mongoose'

export interface IStudent extends Document {
  serial: number
  name: string
  gender: string
  status: string
}

export enum EGender {
  MALE = 'male',
  FEMALE = 'female',
}

export enum EStatus {
  NORMAL = 'normal',
  UNNORMAL = 'unnormal',
}
