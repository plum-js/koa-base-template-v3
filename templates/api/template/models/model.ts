import { model, PaginateModel } from 'mongoose'
import { IStudent } from './interface'
import { StudentSchema } from './schema'

export const StudentModel: PaginateModel<IStudent> = model('student', StudentSchema)
