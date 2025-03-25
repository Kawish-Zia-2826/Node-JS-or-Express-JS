import express from "express";
import Contact from "../models/contact_module.js"; 

const router = express.Router();
import {
  allContact,
  getContact,
  addContact,
  updateContact,
  updateContacts,
  addContacts,
  deleteContact
} from '../controller/contact.controller.js'


router.get("/", allContact);
router.get("/show-contact/:id", getContact);
router.get("/add-contact", addContact);
router.post("/add-contact",addContacts);
router.get("/update-contact/:id",updateContact);
router.post("/update-contact/:id", updateContacts);
router.get("/delete/:id", deleteContact);


export default router