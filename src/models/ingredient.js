import { model, Schema } from 'mongoose'

const ingredientSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 64,
    },
    desc: {
      type: String,
      trim: true,
      default: '',
      maxlength: 200,
    },
    img: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  },
)

ingredientSchema.index({ name: 1 })

export const Ingredient = model('Ingredient', ingredientSchema)
