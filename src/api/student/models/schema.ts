import { Schema } from 'mongoose';
import aggregatePaginate from 'mongoose-paginate-v2';
import { EGender, EStatus } from './interface';

const StudentSchema = new Schema(
  {
    serial: Number,
    name: String,
    gender: {
      type: String,
      enum: Object.values(EGender),
    },
    status: {
      type: String,
      enum: Object.values(EStatus),
    },
  },
  {
    timestamps: {},
    versionKey: false,
  }
);

StudentSchema.plugin(aggregatePaginate);

export { StudentSchema };
