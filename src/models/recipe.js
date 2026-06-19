import { model, Schema } from 'mongoose'

const recipeIngredientSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    measure: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    _id: false,
  },
)

const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    instructions: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    thumb: {
      type: String,
      required: false,
      trim: true,
    },
    time: {
      type: String,
      required: true,
      trim: true,
    },
    cals: {
      type: String,
      required: false,
      trim: true,
    },
    ingredients: {
      type: [recipeIngredientSchema],
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

recipeSchema.index({ title: 1, category: 1 })

export const Recipe = model('Recipe', recipeSchema)
