const { Schema, model } = require("mongoose");

const taskSchema = new Schema(
  {
    taskFamily: {
      type: Schema.Types.ObjectId,
      ref: 'Family',
    },
    taskOwner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    taskIcon: {
      type: String,
      required: [false, "Choose an icon for the task"],
    },
    taskName: {
      type: String,
      required: [false, "Task Name is required."],
    },
    taskDescription: {
      type: String,
      required: [true, "Task Description is required."],
    },
    taskTime: {
      type: String,
      required: [true, "Choose a timing interval to finish the task"],
      enum: [
        "On Wake Up",
        "Before Breakfast",
        "After Breakfast",
        "Before Lunch",
        "After Lunch",
        "In the Afternoon",
        "Before Dinner",
        "After Dinner",
        "Before Sleep",
      ],
    },
    taskWeekDay: {
      type: String,
      required: [true, "Choose a day of the week"],
      enum: [
        "Everyday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
    },
    taskAssignedTo: {
     type: Schema.Types.ObjectId,
      ref: 'User',
     required: [false, "Choose a family member"],
    },
    taskIsDone: {
      type: Boolean,
      default: false,
    },
    taskImgUploaded: {
      type: String,
    },
    taskComments: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Task = model("Task", taskSchema);

module.exports = Task;
