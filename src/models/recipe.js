import { model, Schema } from 'mongoose'

const recipeIngredientSchema = new Schema(
  {
    id: {
      type: Schema.Types.ObjectId,
      ref: 'Ingredient',
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
    area: {
      type: String,
      required: true,
      trim: true,
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
      required: true,
      trim: true,
    },
    time: {
      type: String,
      required: true,
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

recipeSchema.index({ title: 1 })
recipeSchema.index({ category: 1 })
recipeSchema.index({ 'ingredients.id': 1 })

export const Recipe = model('Recipe', recipeSchema)
