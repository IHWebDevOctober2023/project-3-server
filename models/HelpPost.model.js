const { Schema, model } = require("mongoose");


const helpPostSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required."],
        },
        location: {
            type: String,
            required: [true, "Location is required."],
        },
        description: {
            type: String,
            required: [true, "Description is required."],
        },
        helpImageUrl: {
            type: String,
        },
        creator:  {type: Schema.Types.ObjectId, ref: "User"},
        category: {
            type: String,
            enum: ["learning", "transport", "tech", "house-chores", "furniture", "house-repairs", "chat-sessions"],
            required: [true, "Please, choose a category."],
        },
        volunteers: {type: Schema.Types.ObjectId, ref: "User"},
        
        selectedVolunteer:  {type: Schema.Types.ObjectId, ref: "User"},
        
        isCompleted: {
            type: Boolean,
            default: false
        }
    },
    {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const HelpPost = model("HelpPost", helpPostSchema);
module.exports = HelpPost;