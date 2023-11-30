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
      default: "https://static.vecteezy.com/system/resources/previews/026/619/142/original/default-avatar-profile-icon-of-social-media-user-photo-image-vector.jpg",
    },
    skills: {
      type: String,
      enum: ["Languages", "Tech", "Strength", "Electronics", "Softwares", "Dancing", "Active listening", "Body disciplines", "Coaching", "Humor", "Sports" ]
    },
    tokens: {
      type: Number
    },
    testimonies: {
      type: [{ type: Schema.Types.ObjectId, ref: "Testimony" }]
    }

  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
