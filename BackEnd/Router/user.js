import { Router } from 'express';
const router = Router();
import BasicInfo from '../Schemas/BasicInfo.js';
import Project from "../Schemas/Project.js";
import bodyParser from 'body-parser';
import { body, validationResult } from "express-validator";
import transpoter from "../MailTranspoter.js";



router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }))

router.get("/getInfo", async (req, res) => {
       try {
              let data = await BasicInfo.findOne({}, { about: 0, skills: 0, resume: 0, socialMedia: 0 }).exec();
              res.status(200).json(data);
       } catch (err) {
              res.status(500).json({ "message": "Something is Wrong" });
       }
});
router.get("/getResume", async (req, res) => {
       try {
              let data = await BasicInfo.findOne({}, { resume: 1 }).exec();
              res.status(200).json(data);
       } catch (err) {
              res.status(500).json({ "message": "Something is Wrong" });
       }
})
router.get("/socialMedia", async (req, res) => {
       try {
              let data = await BasicInfo.findOne({}, { socialMedia: 1 }).exec();
              res.status(200).json(data);
       } catch (err) {
              res.status(500).json({ "message": "Something is Wrong" });
       }
})
router.get("/about", async (req, res) => {
       try {
              let data = await BasicInfo.findOne({}, { sortDescription: 0, resume: 0, socialMedia: 0 }).exec();
              res.status(200).json(data);
       } catch (err) {
              res.status(500).json({ "message": "Something is Wrong" });
       }
});

router.get("/projects", async (req, res) => {
       try {
              let data = await Project.find({}, { id: 1, name: 1, bannerImage: 1 }).exec();

              res.status(200).json(data);
       } catch (err) {
              res.status(500).json({ "message": "Something is Wrong" });
       }
});

router.get("/getProject", async (req, res) => {
       try {
              let data = await Project.find({ _id: req.query.id }).exec();
              res.status(200).json(data);
       } catch (err) {
              res.status(500).json({ "message": "Something is Wrong" });
       }
});

router.post("/contact", body('email').isEmail(), body('message').isLength({ min: 2 }), async (req, res) => {
       try {

              const error = validationResult(req);

              if (!error.isEmpty()) {
                     res.status(403).json({ "message": "Please Enter Valid information" });
              }
              else {

                     let info = transpoter.sendMail({
                            from: process.env.MAIL,
                            to: process.env.MAIL,
                            subject: "PORTFOLLIO CONTACT",
                            text: `Email: ${req.body.email} \nMessage: ${req.body.message}`,
                            headers: process.env.MAIL,
                            replyTo: req.body.email,
                     });
                     // console.log(info);
                     res.status(200).json({ "message": "Message Successfully Sended" })
              }
       } catch (err) {
              console.log(err);
              res.status(500).json({ "message": "Something is Wrong" });
       }
});




export default router;