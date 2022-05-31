import mongoose from "mongoose";

let project = new mongoose.Schema({
       name: {
              type: String,
              required: true,
       },
       description: {
              type: String,
              required: true
       },
       technologies: {
              type: Array,
       },
       liveHostedLink: {
              type: String
       },
       images: {
              type: Array
       },
       bannerImage: {
              type: String
       },
       github: {
              type: String
       }

})

export default mongoose.model("project", project);