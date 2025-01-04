import mongoose from 'mongoose';

const { Schema, model } = mongoose;

// Predefined income sources
const incomeSources = [
  'Salary',
  'Pocket Money',
  'Freelancing',
  'Business',
  'Investments',
  'Rent',
  'Gifts',
  'Other',
];

// Define the Income schema
const incomeSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: [0, 'Amount must be a positive number'],
    },
    source: {
      type: String,
      enum: {
        values: incomeSources,
        message: '{VALUE} is not a valid income source',
      },
      required: [true, 'Income source is required'],
    },
    customSource: {
      type: String,
      trim: true,
      maxlength: [50, 'Custom source must not exceed 50 characters'],
      validate: {
        validator: function () {
          // Ensure customSource is provided only when the source is 'Other'
          return this.source !== 'Other' || (this.customSource && this.customSource.trim().length > 0);
        },
        message: 'Custom source is required when "Other" is selected',
      },
    },
    description: {
      type: String,
      trim: true,
      maxlength: [255, 'Description must not exceed 255 characters'],
    },
    date: {
      type: Date,
      default: Date.now,
      required: [true, 'Date is required'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Compile the model
const Income = model('Income', incomeSchema);

export default Income;
