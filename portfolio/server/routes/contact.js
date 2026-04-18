import { Router } from "express";

const router = Router();

const validateEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// POST /api/contact
router.post("/", (req, res) => {
  const { name, email, subject, message } = req.body;
  const errors = {};

  if (!name || name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }
  if (!email || !validateEmail(email)) {
    errors.email = "Please provide a valid email address.";
  }
  if (!subject || subject.trim().length < 3) {
    errors.subject = "Subject must be at least 3 characters.";
  }
  if (!message || message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({ success: false, errors });
  }

  // Log to console (replace with nodemailer for real email)
  console.log("\n📬 New Contact Message:");
  console.log(`  From:    ${name} <${email}>`);
  console.log(`  Subject: ${subject}`);
  console.log(`  Message: ${message}`);
  console.log("─".repeat(50));

  res.status(200).json({
    success: true,
    message: "Your message has been sent successfully! I'll get back to you soon.",
  });
});

export default router;
