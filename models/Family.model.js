const { Schema, model } = require("mongoose");

const familySchema = new Schema(
  {
    familyName: {
      type: String,
      required: [true, "Family Name is required."],
      unique: true,
    },
    familyCode: {
      type: String,
      required: [true, "Family Code is required"],
      unique: true,
    },
    familyMembers: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
    }],
    familyPicture: {
      type: String,
      default: "https://www.inclusivechoices.com.au/wp-content/uploads/2022/08/thumb-print-sml2.png", // url
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
