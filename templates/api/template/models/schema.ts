import { Schema } from 'mongoose'
import mp = require('mongoose-paginate-v2')

const StudentSchema = new Schema(
  {
    serial: Number,
    name: String,
    gender: {
      type: String,
      enum: ['male', 'female'],
    },
    status: {
      type: String,
      enum: ['normal', 'unnormal'],
    },
  },
  {
    timestamps: {},
    versionKey: false,
  }
)

StudentSchema.plugin(mp)

export { StudentSchema }
