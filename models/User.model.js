const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: [true, "Email already exists in our database."],
      lowercase: true,
      trim: true,
      validate: {validator: (v) => {return /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(v);},message: props => `${props.value} is not a valid email address!`}
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    name: {
      type: String,
      required: [true, "Username is required."],
    },
    location: {
      type: String
    },
    profilePicture: {
      type: String,
      default: "/images/icon_person_.png"
    },
    skills: {
      type: String,
      enum: ["Languages", "Tech", "Strength", "Electronics", "Softwares", "Dancing", "Active listening", "Body disciplines", "Coaching", "Humor", "Sports" ]
    },
    description: {
      type: String,
      default: "Your description here!",
    },
    tokens: {
      type: Number,
      default: 3,
    },
    testimonies: {
      type: [{ type: Schema.Types.ObjectId, ref: "Testimony" }]
    },
    helpPosts: {
      type: [{ type: Schema.Types.ObjectId, ref: "HelpPost" }]
    }

  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
