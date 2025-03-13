import { model, PaginateModel } from 'mongoose';
import { IStudent } from './interface';
import { StudentSchema } from './schema';
import {
  CreateValidator,
  PutValidator,
  PatchValidator,
  FindValidator,
  DeleteValidator,
} from '../validators';
import { RestAdapter } from '../../../rest';

const StudentModel: unknown = model('students', StudentSchema);

class Student extends RestAdapter<IStudent> {
  constructor(
    public model = StudentModel as PaginateModel<IStudent>,
    public validators = {
      CreateValidator,
      PutValidator,
      PatchValidator,
      FindValidator,
      DeleteValidator,
    }
  ) {
    super();
  }
}

export { StudentModel, Student };
