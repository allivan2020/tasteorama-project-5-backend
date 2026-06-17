import { model, Schema } from 'mongoose'

const userSchema = new Schema(
  {
    username: {
      type: String,
      maxlength: 16,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      maxlength: 128,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      minlength: 8,
      maxlength: 128,
      required: true,
    },
    avatar: {
      type: String,
      default: null,
    },
    favorites: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Recipe',
        },
      ],
      default: [],
    },
  },
  { timestamps: true },
)

userSchema.methods.toJSON = function () {
  const obj = this.toObject()
  delete obj.password
  return obj
}

export const User = model('User', userSchema)