const { Schema, model } = require("mongoose");

const familySchema = new Schema(
  {
    familyName: {
      type: String,
      required: [true, "Family Name is required."],
      unique: true,
    },
/*     familyCode: {
      type: String,
      required: [true, "Family Code is required"],
      unique: true,
    }, */
    familyMembers: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
    }],
    familyPicture: {
      type: String,
      default: "./images/profilePictureDefault.jpg", // url
    },
    tasksWeekly: {
      type: Number,
      default: 0, // Default value for weekly tasks
    },
  },
  {
    timestamps: true,
  }
);

const Family = model("Family", familySchema);

module.exports = Family;
