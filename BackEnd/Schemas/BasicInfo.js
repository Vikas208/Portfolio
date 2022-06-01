import mongoose from "mongoose";

const info = new mongoose.Schema({
       name: {
              type: String,
              required: true
       },
       about: {
              type: String,
              required: true,
       },
       sortDescription: {
              type: String,
              required: true
       },
       image: {
              type: Array
       },
       socialMedia: {
              type: Object
       },
       skills: {
              type: Object
       },
       resume: {
              type: String
       },
       education: {
              type: Array,
       }

})

export default mongoose.model("BasicInfo", info);