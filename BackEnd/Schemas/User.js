import mongoose from 'mongoose';

const schema = new mongoose.Schema({
       mailId: {
              type: String,
              required
       },
       password: {
              type: String,
              required
       }
});

export default mongoose.model("user", schema);