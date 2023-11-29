const { Schema, model } = require("mongoose");

const helpPostSchema = new Schema(
   
    {
        username: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        helpImageUrl: {
            type: String,
        
        },
        tokens: {
            type: String
        },
        creator: {
            type: [{type: Schema.Types.ObjectId, ref: "User"}],
            required: true
        },
        category: {
            type: String,
            enum: ["learning", "transport", "tech", "house-chores", "furniture", "house-repairs", "chat-sessions"],
            required: true
        },
        volunteers: {
            type: [{type: Schema.Types.ObjectId, ref: "User"}],
            required: true
        },
        selectedVolunteer: {
            type: {type: Schema.Types.ObjectId, ref: "User"},
            required: true

        },
        tokenId: {
            type: ObjectId,
            required: true
        },
        isCompleted: false,



    }
);

const HelpPost = model("HelpPost", helpPostSchema)
module.exports = HelpPost;