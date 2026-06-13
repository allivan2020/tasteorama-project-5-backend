<<<<<<< HEAD

=======
>>>>>>> 8297d87632b760b9275ab0d69ac3b5e4df70244b
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
<<<<<<< HEAD
    avatar: {
      type: String,
      default: null,
    },
=======
>>>>>>> 8297d87632b760b9275ab0d69ac3b5e4df70244b
  },
  { timestamps: true },
)

userSchema.methods.toJSON = function () {
<<<<<<< HEAD
  const obj = this.toObject()
  delete obj.password
  return obj
}

export const User = model('User', userSchema)
=======
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const User = model('User', userSchema)
>>>>>>> 8297d87632b760b9275ab0d69ac3b5e4df70244b
