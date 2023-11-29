const { Schema, model } = require("mongoose");

const validateEmail = (v) => {
  return /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(v);
  message: props => `${props.value} is not a valid email address!`
}

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validateEmail, "Please use a valid email address"],
      match: [/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(v), "Please use a valid email address"]
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    username: {
      type: String,
      required: [true, "Username is required."],
    },
    location: {
      type: String,
      required: true
    },
    profilePicture: {
      type: String,
      default: "default.png",
    },
    skills: {
      type: String,
      enum: ["Languages", "Strength", "Electronics", "Hardware"]
    },
    tokens: {
      type: Number
    },
    testimonies: {
      type: [{ type: Schema.Types.ObjectId, ref: "Testimony" }]
    }

  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
