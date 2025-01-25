import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence";
const AutoIncrement = AutoIncrementFactory(mongoose);

const fieldSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Farmer', 
      required: true,
    },
    field_id: {
      type: Number,
      unique: true,
    },
    field_name: {
      type: String,
      required: true,
    },
    crop: {
      type: String,
      required: true,
    },
    path: {
      type: [
        {
          type: [Number], // Array containing [latitude, longitude]
          validate: {
            validator: function (value) {
              return value.length === 2; // Ensure each sub-array has exactly two elements
            },
            message: 'Each coordinate must contain exactly two elements: [latitude, longitude].',
          },
        },
      ],
      required: true,
      validate: {
        validator: function (value) {
          return value.length > 0; // Ensure at least one coordinate pair exists
        },
        message: 'Coordinates array must contain at least one boundary point.',
      },
    },
    area: {
      type: Number,
      required: true,
      min: 0, 
    },
  },
  {
    timestamps: true, 
  }
);

fieldSchema.plugin(AutoIncrement, { inc_field: 'field_id' });

const Field = mongoose.model("Field", fieldSchema);

export default Field;
