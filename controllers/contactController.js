const { ContactMessage } = require('../models');
const nodemailer = require('nodemailer');

// ── Create transporter (only if credentials are set) ──────────────────────
const createTransporter = () => {
  if (!process.env.MAIL_USER || process.env.MAIL_PASS === 'your_gmail_app_password_here' || !process.env.MAIL_PASS) {
    return null; // email not configured
  }
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });
};

// ── Send notification email to admin ─────────────────────────────────────
const sendAdminEmail = async ({ name, email, subject, message }) => {
  const transporter = createTransporter();
  if (!transporter) return; // silently skip if not configured

  const mailOptions = {
    from: `"Portfolio Contact" <${process.env.MAIL_USER}>`,
    to: process.env.MAIL_TO,
    subject: `📬 New Message: ${subject || 'Portfolio Contact Form'}`,
    html: `
      <div style="font-family:Inter,Arial,sans-serif;max-width:600px;margin:0 auto;background:#0d1426;color:#f1f5f9;border-radius:12px;overflow:hidden;">
        <div style="background:linear-gradient(135deg,#6366f1,#8b5cf6,#06b6d4);padding:24px 32px;">
          <h2 style="margin:0;color:#fff;font-size:1.4rem;">New Contact Message</h2>
          <p style="margin:6px 0 0;color:rgba(255,255,255,0.8);font-size:0.9rem;">from your portfolio website</p>
        </div>
        <div style="padding:28px 32px;">
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:10px 0;color:#94a3b8;font-size:0.85rem;width:90px;">Name</td>
              <td style="padding:10px 0;font-weight:600;">${name}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;color:#94a3b8;font-size:0.85rem;">Email</td>
              <td style="padding:10px 0;"><a href="mailto:${email}" style="color:#6366f1;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding:10px 0;color:#94a3b8;font-size:0.85rem;">Subject</td>
              <td style="padding:10px 0;">${subject || '—'}</td>
            </tr>
          </table>
          <div style="margin-top:20px;padding:20px;background:rgba(255,255,255,0.04);border-radius:8px;border:1px solid rgba(255,255,255,0.08);">
            <p style="color:#94a3b8;font-size:0.8rem;margin:0 0 10px;">Message</p>
            <p style="margin:0;line-height:1.7;">${message}</p>
          </div>
          <div style="margin-top:24px;text-align:center;">
            <a href="mailto:${email}" style="display:inline-block;padding:12px 28px;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;text-decoration:none;border-radius:50px;font-weight:600;font-size:0.9rem;">
              Reply to ${name}
            </a>
          </div>
        </div>
        <div style="padding:16px 32px;border-top:1px solid rgba(255,255,255,0.06);text-align:center;font-size:0.75rem;color:#475569;">
          Mohammed Yasir · Portfolio · mohammedyasir2911@gmail.com
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Email notification sent for message from ${name}`);
  } catch (err) {
    console.warn('⚠️  Email notification failed (check MAIL_PASS in .env):', err.message);
    // Don't throw — message is still saved to DB even if email fails
  }
};

// ── Controllers ───────────────────────────────────────────────────────────
const getAll = async (req, res) => {
  try {
    const data = await ContactMessage.findAll({ order: [['createdAt', 'DESC']] });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email and message are required' });
    }
    const item = await ContactMessage.create({ name, email, subject, message });

    // Send email notification (async, non-blocking)
    sendAdminEmail({ name, email, subject, message });

    res.status(201).json({ success: true, data: item, message: 'Message sent successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const markRead = async (req, res) => {
  try {
    const item = await ContactMessage.findByPk(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Message not found' });
    await item.update({ is_read: true });
    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const item = await ContactMessage.findByPk(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Message not found' });
    await item.destroy();
    res.json({ success: true, message: 'Message deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAll, create, markRead, remove };
