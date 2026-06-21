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
    calories: {
      type: Number,
      min: 0,
      required: false,
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
    toJSON: {
      transform: normalizeLegacyCalories,
    },
    toObject: {
      transform: normalizeLegacyCalories,
    },
  },
)

function normalizeLegacyCalories(_document, recipe) {
  if (
    recipe.calories == null &&
    recipe.cals != null &&
    recipe.cals.trim() !== ''
  ) {
    const legacyCalories = Number(recipe.cals)

    if (Number.isFinite(legacyCalories)) {
      recipe.calories = legacyCalories
    }
  }

  delete recipe.cals

  return recipe
}

recipeSchema.index({ title: 1, category: 1 })

export const Recipe = model('Recipe', recipeSchema)
