import Contact from "../models/contact_module.js";
import mongoose from 'mongoose';
import { body, validationResult } from 'express-validator';

// ✅ Validation middleware
export const validateContact = [
  body('first_name').notEmpty().withMessage('First name is required'),
  body('last_name').notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').notEmpty().isLength({ min: 10 }).withMessage('Phone must be at least 10 characters'),
  body('address').notEmpty().withMessage('Address is required')
];

// ✅ GET /add
export const addContact = (req, res) => {
  res.render("add-contact.ejs");
};

// ✅ POST /add
export const addContacts = async (req, res) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ errors: err.array() });
  }

  try {
    await Contact.create(req.body);
    res.redirect("/");
  } catch (error) {
    res.status(500).render("404.ejs", { message: error.message });
  }
};

// ✅ GET /:id
export const getContact = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.render("404.ejs", { message: "Page not found" });
    }

    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.render("404.ejs", { message: "Page not found" });
    }

    res.render("show-contact.ejs", { contact });
  } catch (error) {
    res.render("404.ejs", { message: error.message });
  }
};

// ✅ GET /update/:id
export const updateContact = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.render("404.ejs", { message: "Page not found" });
    }

    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.render("404.ejs", { message: "Page not found" });
    }

    res.render("update-contact.ejs", { contact });
  } catch (error) {
    res.render("404.ejs", { message: error.message });
  }
};

// ✅ POST /update/:id
export const updateContacts = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.render("404.ejs", { message: "Page not found" });
    }

    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body);
    if (!contact) {
      return res.render("404.ejs", { message: "Page not found" });
    }

    res.redirect("/");
  } catch (error) {
    res.render("404.ejs", { message: error.message });
  }
};

// ✅ GET /delete/:id
export const deleteContact = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.render("404.ejs", { message: "Page not found" });
    }

    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.render("404.ejs", { message: "Page not found" });
    }

    res.redirect("/");
  } catch (error) {
    res.render("404.ejs", { message: error.message });
  }
};

// ✅ GET / (all contacts with pagination)
export const allContact = async (req, res) => {
  try {
    const { page = 1, limit = 3 } = req.query;

    const result = await Contact.paginate({}, {
      page: parseInt(page),
      limit: parseInt(limit),
    });

    res.render("all-post.ejs", { contact: result });
  } catch (error) {
    res.render("404.ejs", { message: error.message });
  }
};
