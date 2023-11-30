
const { Schema, model } = require("mongoose");

const testimonySchema = new Schema(
   
    {
        text: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            min:1,
            max: 5,
            required: true
        },
        creator: {
            type: [{type: Schema.Types.ObjectId, ref: "User"}]
        }


    }
);

const Testimony = model("Testimony", testimonySchema)
module.exports = Testimony;