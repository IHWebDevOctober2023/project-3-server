const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    name: {
      type: String,
      required: [true, "Name is required."],
      unique: true,
    },
    userPicture: {
      type: String,
      default: "./images/defaultIcon.png",
    },
    role: {
      type: String,
      enum: ["Parent", "Child"],
    },
    age: {
      type: Number,
      default: 0,
    },
    family: {
      type: Schema.Types.ObjectId,
      ref: 'Family',
    },
    tasksCreated: [{
      type: Schema.Types.ObjectId,
      ref: 'Task',
    }],
    tasksAssigned: {
      type: Number,
      default: 0,
    },
    tasksDone: {
      type: Number,
      default: 0,
    },
    kpi: {
      type: Number,
      default: 0,
    },
    rewards: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
