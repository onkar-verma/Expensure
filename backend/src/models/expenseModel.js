import mongoose from 'mongoose';

const { Schema, model } = mongoose;

// Predefined categories
const categories = [
  'Grocery',
  'Beauty',
  'Entertainment',
  'Utilities',
  'Transportation',
  'Health',
  'Education',
  'Dining',
  'Shopping',
  'Other',
];

// Define the Expense schema
const expenseSchema = new Schema(
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
    category: {
      type: String,
      enum: {
        values: categories,
        message: '{VALUE} is not a valid category',
      },
      required: [true, 'Category is required'],
    },
    customCategory: {
      type: String,
      trim: true,
      maxlength: [50, 'Custom category must not exceed 50 characters'],
      validate: {
        validator: function () {
          // Ensure customCategory is provided only when the category is 'Other'
          return this.category !== 'Other' || (this.customCategory && this.customCategory.trim().length > 0);
        },
        message: 'Custom category is required when "Other" is selected',
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


const Expense = model('Expense', expenseSchema);

export default Expense;
