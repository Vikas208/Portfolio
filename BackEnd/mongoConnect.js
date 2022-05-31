import mongoose from 'mongoose';
export default function mongoConnect() {

       mongoose.connect(process.env.URI, (err) => {
              // console.log(err);
              if (err) {
                     console.log("Mongo Not Connected")
              }
              else
                     console.info("Mongo Connected");
       })
}