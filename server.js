// // // const express = require('express');
// // // const nodemailer = require('nodemailer');
// // // const cors = require('cors');
// // // require('dotenv').config();

// // // const app = express();
// // // app.use(express.json());
// // // app.use(cors());

// // // // ─── Nodemailer Transporter ───────────────────────────────────────────────────
// // // const transporter = nodemailer.createTransport({
// // //   service: 'gmail',
// // //   auth: {
// // //     user: process.env.EMAIL_USER,   // aapka Gmail (sender)
// // //     pass: process.env.EMAIL_PASS,   // Gmail App Password (16-digit)
// // //   },
// // // });

// // // // ─── POST /api/volunteer ──────────────────────────────────────────────────────
// // // app.post('/api/volunteer', async (req, res) => {
// // //   const {
// // //     fullName, email, phone, age,
// // //     city, role, availability,
// // //     experience, motivation,
// // //   } = req.body;

// // //   // Basic server-side validation
// // //   if (!fullName || !email || !phone || !age || !city || !role || !availability || !motivation) {
// // //     return res.status(400).json({ success: false, message: 'Saare required fields bharo.' });
// // //   }

// // //   // ── HTML Email Template ─────────────────────────────────────────────────────
// // //   const htmlContent = `
// // //   <!DOCTYPE html>
// // //   <html>
// // //   <head>
// // //     <meta charset="UTF-8" />
// // //     <style>
// // //       body { font-family: 'Segoe UI', Arial, sans-serif; background: #f4f6fb; margin: 0; padding: 0; }
// // //       .wrapper { max-width: 620px; margin: 30px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 30px rgba(0,43,92,0.12); }
// // //       .header { background: #002b5c; padding: 32px 36px; text-align: center; }
// // //       .header h1 { color: #ffd100; font-size: 1.8rem; margin: 0 0 6px; }
// // //       .header p { color: rgba(255,255,255,0.75); font-size: 0.9rem; margin: 0; }
// // //       .badge { display: inline-block; background: #ffd100; color: #002b5c; font-size: 0.75rem; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; padding: 4px 14px; border-radius: 20px; margin-bottom: 12px; }
// // //       .body { padding: 32px 36px; }
// // //       .section-title { font-size: 0.75rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #002b5c; border-left: 4px solid #ffd100; padding-left: 10px; margin: 24px 0 14px; }
// // //       .row { display: flex; margin-bottom: 12px; }
// // //       .label { min-width: 160px; font-weight: 600; color: #444; font-size: 0.88rem; }
// // //       .value { color: #222; font-size: 0.88rem; flex: 1; }
// // //       .textarea-val { background: #f8f9ff; border-radius: 8px; padding: 12px 14px; color: #333; font-size: 0.87rem; line-height: 1.6; margin-top: 6px; white-space: pre-wrap; }
// // //       .divider { height: 1px; background: #eef0f7; margin: 8px 0; }
// // //       .footer { background: #f8f9ff; padding: 20px 36px; text-align: center; color: #999; font-size: 0.8rem; border-top: 1px solid #eee; }
// // //       .footer strong { color: #002b5c; }
// // //     </style>
// // //   </head>
// // //   <body>
// // //     <div class="wrapper">
// // //       <div class="header">
// // //         <span class="badge">New Application</span>
// // //         <h1>🐾 New Volunteer Application</h1>
// // //         <p>Ek naya volunteer apply kiya hai — details neeche hain</p>
// // //       </div>
// // //       <div class="body">

// // //         <div class="section-title">Personal Information</div>

// // //         <div class="row">
// // //           <span class="label">👤 Full Name</span>
// // //           <span class="value">${fullName}</span>
// // //         </div>
// // //         <div class="divider"></div>
// // //         <div class="row">
// // //           <span class="label">📧 Email</span>
// // //           <span class="value"><a href="mailto:${email}" style="color:#002b5c;">${email}</a></span>
// // //         </div>
// // //         <div class="divider"></div>
// // //         <div class="row">
// // //           <span class="label">📞 Phone</span>
// // //           <span class="value">${phone}</span>
// // //         </div>
// // //         <div class="divider"></div>
// // //         <div class="row">
// // //           <span class="label">🎂 Age</span>
// // //           <span class="value">${age} years</span>
// // //         </div>
// // //         <div class="divider"></div>
// // //         <div class="row">
// // //           <span class="label">🏙️ City</span>
// // //           <span class="value">${city}</span>
// // //         </div>

// // //         <div class="section-title">Role & Availability</div>

// // //         <div class="row">
// // //           <span class="label">🙋 Role Applied For</span>
// // //           <span class="value">${role}</span>
// // //         </div>
// // //         <div class="divider"></div>
// // //         <div class="row">
// // //           <span class="label">🕐 Availability</span>
// // //           <span class="value">${availability}</span>
// // //         </div>

// // //         <div class="section-title">About the Applicant</div>

// // //         <div>
// // //           <span class="label">📋 Prior Experience</span>
// // //           <div class="textarea-val">${experience || 'Koi experience share nahi ki gayi.'}</div>
// // //         </div>
// // //         <br/>
// // //         <div>
// // //           <span class="label">💬 Motivation</span>
// // //           <div class="textarea-val">${motivation}</div>
// // //         </div>

// // //       </div>
// // //       <div class="footer">
// // //         Yeh email <strong>Volunteer Application Form</strong> se automatically bheji gayi hai.<br/>
// // //         Submitted on: <strong>${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</strong>
// // //       </div>
// // //     </div>
// // //   </body>
// // //   </html>
// // //   `;

// // //   // ── Mail Options ────────────────────────────────────────────────────────────
// // //   const mailOptions = {
// // //     from: `"Volunteer Form 🐾" <${process.env.EMAIL_USER}>`,
// // //     to: 'Agnipathfoods@gmail.com',
// // //     replyTo: email,                         // reply directly to applicant
// // //     subject: `🐾 New Volunteer Application — ${fullName} (${role})`,
// // //     html: htmlContent,
// // //   };

// // //   try {
// // //     await transporter.sendMail(mailOptions);
// // //     console.log(`✅ Email sent for: ${fullName} <${email}>`);
// // //     return res.status(200).json({ success: true, message: 'Application successfully bheji gayi!' });
// // //   } catch (err) {
// // //     console.error('❌ Email error:', err.message);
// // //     return res.status(500).json({ success: false, message: 'Email bhejne mein error aaya. Dobara try karein.' });
// // //   }
// // // });

// // // // ─── Health Check ─────────────────────────────────────────────────────────────
// // // app.get('/', (req, res) => res.send('🐾 Volunteer API is running!'));

// // // // ─── Start Server ─────────────────────────────────────────────────────────────
// // // const PORT = process.env.PORT || 5000;
// // // app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));







// // const express = require('express');
// // const nodemailer = require('nodemailer');
// // const cors = require('cors');

// // const app = express();
// // app.use(express.json());
// // app.use(cors());

// // // ─── Nodemailer Transporter ───────────────────────────────────────────────────
// // const transporter = nodemailer.createTransport({
// //   service: 'gmail',
// //   auth: {
// //     user: 'Agnipathfoods@gmail.com',
// //     pass: 'hzhj dfr6767ne',          // Gmail App Password
// //   },
// // });

// // // ─── POST /api/volunteer ──────────────────────────────────────────────────────
// // app.post('/api/volunteer', async (req, res) => {
// //   const {
// //     fullName, email, phone, age,
// //     city, role, availability,
// //     experience, motivation,
// //   } = req.body;

// //   // Basic server-side validation
// //   if (!fullName || !email || !phone || !age || !city || !role || !availability || !motivation) {
// //     return res.status(400).json({ success: false, message: 'Saare required fields bharo.' });
// //   }

// //   // ── HTML Email Template ─────────────────────────────────────────────────────
// //   const htmlContent = `
// //   <!DOCTYPE html>
// //   <html>
// //   <head>
// //     <meta charset="UTF-8" />
// //     <style>
// //       body { font-family: 'Segoe UI', Arial, sans-serif; background: #f4f6fb; margin: 0; padding: 0; }
// //       .wrapper { max-width: 620px; margin: 30px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 30px rgba(0,43,92,0.12); }
// //       .header { background: #002b5c; padding: 32px 36px; text-align: center; }
// //       .header h1 { color: #ffd100; font-size: 1.8rem; margin: 0 0 6px; }
// //       .header p { color: rgba(255,255,255,0.75); font-size: 0.9rem; margin: 0; }
// //       .badge { display: inline-block; background: #ffd100; color: #002b5c; font-size: 0.75rem; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; padding: 4px 14px; border-radius: 20px; margin-bottom: 12px; }
// //       .body { padding: 32px 36px; }
// //       .section-title { font-size: 0.75rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #002b5c; border-left: 4px solid #ffd100; padding-left: 10px; margin: 24px 0 14px; }
// //       .row { display: flex; margin-bottom: 12px; }
// //       .label { min-width: 160px; font-weight: 600; color: #444; font-size: 0.88rem; }
// //       .value { color: #222; font-size: 0.88rem; flex: 1; }
// //       .textarea-val { background: #f8f9ff; border-radius: 8px; padding: 12px 14px; color: #333; font-size: 0.87rem; line-height: 1.6; margin-top: 6px; white-space: pre-wrap; }
// //       .divider { height: 1px; background: #eef0f7; margin: 8px 0; }
// //       .footer { background: #f8f9ff; padding: 20px 36px; text-align: center; color: #999; font-size: 0.8rem; border-top: 1px solid #eee; }
// //       .footer strong { color: #002b5c; }
// //     </style>
// //   </head>
// //   <body>
// //     <div class="wrapper">
// //       <div class="header">
// //         <span class="badge">New Application</span>
// //         <h1>🐾 New Volunteer Application</h1>
// //         <p>Ek naya volunteer apply kiya hai — details neeche hain</p>
// //       </div>
// //       <div class="body">

// //         <div class="section-title">Personal Information</div>
// //         <div class="row"><span class="label">👤 Full Name</span><span class="value">${fullName}</span></div>
// //         <div class="divider"></div>
// //         <div class="row"><span class="label">📧 Email</span><span class="value"><a href="mailto:${email}" style="color:#002b5c;">${email}</a></span></div>
// //         <div class="divider"></div>
// //         <div class="row"><span class="label">📞 Phone</span><span class="value">${phone}</span></div>
// //         <div class="divider"></div>
// //         <div class="row"><span class="label">🎂 Age</span><span class="value">${age} years</span></div>
// //         <div class="divider"></div>
// //         <div class="row"><span class="label">🏙️ City</span><span class="value">${city}</span></div>

// //         <div class="section-title">Role & Availability</div>
// //         <div class="row"><span class="label">🙋 Role Applied For</span><span class="value">${role}</span></div>
// //         <div class="divider"></div>
// //         <div class="row"><span class="label">🕐 Availability</span><span class="value">${availability}</span></div>

// //         <div class="section-title">About the Applicant</div>
// //         <div>
// //           <span class="label">📋 Prior Experience</span>
// //           <div class="textarea-val">${experience || 'Koi experience share nahi ki gayi.'}</div>
// //         </div>
// //         <br/>
// //         <div>
// //           <span class="label">💬 Motivation</span>
// //           <div class="textarea-val">${motivation}</div>
// //         </div>

// //       </div>
// //       <div class="footer">
// //         Yeh email <strong>Volunteer Application Form</strong> se automatically bheji gayi hai.<br/>
// //         Submitted on: <strong>${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</strong>
// //       </div>
// //     </div>
// //   </body>
// //   </html>
// //   `;

// //   // ── Mail Options ────────────────────────────────────────────────────────────
// //   const mailOptions = {
// //     from: '"Volunteer Form 🐾" <Agnipathfoods@gmail.com>',
// //     to: 'Agnipathfoods@gmail.com',
// //     replyTo: email,
// //     subject: `🐾 New Volunteer Application — ${fullName} (${role})`,
// //     html: htmlContent,
// //   };

// //   try {
// //     await transporter.sendMail(mailOptions);
// //     console.log(`✅ Email sent for: ${fullName} <${email}>`);
// //     return res.status(200).json({ success: true, message: 'Application successfully bheji gayi!' });
// //   } catch (err) {
// //     console.error('❌ Email error:', err.message);
// //     return res.status(500).json({ success: false, message: 'Email bhejne mein error aaya. Dobara try karein.' });
// //   }
// // });

// // // ─── Health Check ─────────────────────────────────────────────────────────────
// // app.get('/', (req, res) => res.send('🐾 Volunteer API is running!'));

// // // ─── Start Server ─────────────────────────────────────────────────────────────
// // const PORT = 5000;
// // app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));










// const express = require('express');
// const nodemailer = require('nodemailer');
// const cors = require('cors');

// const app = express();
// app.use(express.json());
// app.use(cors());

// // ─── Nodemailer Transporter ───────────────────────────────────────────────────
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'Agnipathfoods@gmail.com',
//     pass: 'hzhj dfrl bske ohne',       // Gmail App Password
//   },
// });

// // ─── POST /api/volunteer ──────────────────────────────────────────────────────
// app.post('/api/volunteer', async (req, res) => {
//   const {
//     fullName, email, phone, age,
//     city, role, availability,
//     experience, motivation,
//   } = req.body;

//   // Basic server-side validation
//   if (!fullName || !email || !phone || !age || !city || !role || !availability || !motivation) {
//     return res.status(400).json({ success: false, message: 'Saare required fields bharo.' });
//   }

//   // ── HTML Email Template ─────────────────────────────────────────────────────
//   const htmlContent = `
//   <!DOCTYPE html>
//   <html>
//   <head>
//     <meta charset="UTF-8" />
//     <style>
//       body { font-family: 'Segoe UI', Arial, sans-serif; background: #f4f6fb; margin: 0; padding: 0; }
//       .wrapper { max-width: 620px; margin: 30px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 30px rgba(0,43,92,0.12); }
//       .header { background: #002b5c; padding: 32px 36px; text-align: center; }
//       .header h1 { color: #ffd100; font-size: 1.8rem; margin: 0 0 6px; }
//       .header p { color: rgba(255,255,255,0.75); font-size: 0.9rem; margin: 0; }
//       .badge { display: inline-block; background: #ffd100; color: #002b5c; font-size: 0.75rem; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; padding: 4px 14px; border-radius: 20px; margin-bottom: 12px; }
//       .body { padding: 32px 36px; }
//       .section-title { font-size: 0.75rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #002b5c; border-left: 4px solid #ffd100; padding-left: 10px; margin: 24px 0 14px; }
//       .row { display: flex; margin-bottom: 12px; }
//       .label { min-width: 160px; font-weight: 600; color: #444; font-size: 0.88rem; }
//       .value { color: #222; font-size: 0.88rem; flex: 1; }
//       .textarea-val { background: #f8f9ff; border-radius: 8px; padding: 12px 14px; color: #333; font-size: 0.87rem; line-height: 1.6; margin-top: 6px; white-space: pre-wrap; }
//       .divider { height: 1px; background: #eef0f7; margin: 8px 0; }
//       .footer { background: #f8f9ff; padding: 20px 36px; text-align: center; color: #999; font-size: 0.8rem; border-top: 1px solid #eee; }
//       .footer strong { color: #002b5c; }
//     </style>
//   </head>
//   <body>
//     <div class="wrapper">
//       <div class="header">
//         <span class="badge">New Application</span>
//         <h1>🐾 New Volunteer Application</h1>
//         <p>Ek naya volunteer apply kiya hai — details neeche hain</p>
//       </div>
//       <div class="body">

//         <div class="section-title">Personal Information</div>
//         <div class="row"><span class="label">👤 Full Name</span><span class="value">${fullName}</span></div>
//         <div class="divider"></div>
//         <div class="row"><span class="label">📧 Email</span><span class="value"><a href="mailto:${email}" style="color:#002b5c;">${email}</a></span></div>
//         <div class="divider"></div>
//         <div class="row"><span class="label">📞 Phone</span><span class="value">${phone}</span></div>
//         <div class="divider"></div>
//         <div class="row"><span class="label">🎂 Age</span><span class="value">${age} years</span></div>
//         <div class="divider"></div>
//         <div class="row"><span class="label">🏙️ City</span><span class="value">${city}</span></div>

//         <div class="section-title">Role & Availability</div>
//         <div class="row"><span class="label">🙋 Role Applied For</span><span class="value">${role}</span></div>
//         <div class="divider"></div>
//         <div class="row"><span class="label">🕐 Availability</span><span class="value">${availability}</span></div>

//         <div class="section-title">About the Applicant</div>
//         <div>
//           <span class="label">📋 Prior Experience</span>
//           <div class="textarea-val">${experience || 'Koi experience share nahi ki gayi.'}</div>
//         </div>
//         <br/>
//         <div>
//           <span class="label">💬 Motivation</span>
//           <div class="textarea-val">${motivation}</div>
//         </div>

//       </div>
//       <div class="footer">
//         Yeh email <strong>Volunteer Application Form</strong> se automatically bheji gayi hai.<br/>
//         Submitted on: <strong>${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</strong>
//       </div>
//     </div>
//   </body>
//   </html>
//   `;

//   // ── Mail Options ────────────────────────────────────────────────────────────
//   const mailOptions = {
//     from: '"Volunteer Form 🐾" <Agnipathfoods@gmail.com>',
//     to: 'Agnipathfoods@gmail.com',
//     replyTo: email,
//     subject: `🐾 New Volunteer Application — ${fullName} (${role})`,
//     html: htmlContent,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log(`✅ Email sent for: ${fullName} <${email}>`);
//     return res.status(200).json({ success: true, message: 'Application successfully bheji gayi!' });
//   } catch (err) {
//     console.error('❌ Email error:', err.message);
//     return res.status(500).json({ success: false, message: 'Email bhejne mein error aaya. Dobara try karein.' });
//   }
// });

// // ─── Health Check ─────────────────────────────────────────────────────────────
// app.get('/', (req, res) => res.send('🐾 Volunteer API is running!'));

// // ─── Start Server ─────────────────────────────────────────────────────────────
// const PORT = 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

















const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// ─── Nodemailer Transporter ───────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'Agnipathfoods@gmail.com',
    pass: 'hzhj dfrl bske ohne',
  },
});

// ══════════════════════════════════════════════════════════════════════════════
//  1️⃣  POST /api/volunteer
// ══════════════════════════════════════════════════════════════════════════════
app.post('/api/volunteer', async (req, res) => {
  const { fullName, email, phone, age, city, role, availability, experience, motivation } = req.body;

  if (!fullName || !email || !phone || !age || !city || !role || !availability || !motivation) {
    return res.status(400).json({ success: false, message: 'Saare required fields bharo.' });
  }

  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"/>
  <style>
    body{font-family:'Segoe UI',Arial,sans-serif;background:#f4f6fb;margin:0;padding:0;}
    .wrapper{max-width:620px;margin:30px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 8px 30px rgba(0,43,92,.12);}
    .header{background:#002b5c;padding:32px 36px;text-align:center;}
    .header h1{color:#ffd100;font-size:1.8rem;margin:0 0 6px;}
    .header p{color:rgba(255,255,255,.75);font-size:.9rem;margin:0;}
    .badge{display:inline-block;background:#ffd100;color:#002b5c;font-size:.75rem;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;padding:4px 14px;border-radius:20px;margin-bottom:12px;}
    .body{padding:32px 36px;}
    .section-title{font-size:.75rem;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#002b5c;border-left:4px solid #ffd100;padding-left:10px;margin:24px 0 14px;}
    .row{display:flex;margin-bottom:12px;}
    .label{min-width:160px;font-weight:600;color:#444;font-size:.88rem;}
    .value{color:#222;font-size:.88rem;flex:1;}
    .textarea-val{background:#f8f9ff;border-radius:8px;padding:12px 14px;color:#333;font-size:.87rem;line-height:1.6;margin-top:6px;white-space:pre-wrap;}
    .divider{height:1px;background:#eef0f7;margin:8px 0;}
    .footer{background:#f8f9ff;padding:20px 36px;text-align:center;color:#999;font-size:.8rem;border-top:1px solid #eee;}
    .footer strong{color:#002b5c;}
  </style></head><body>
  <div class="wrapper">
    <div class="header">
      <span class="badge">New Volunteer Application</span>
      <h1>🐾 Volunteer Application</h1>
      <p>Ek naya volunteer apply kiya hai</p>
    </div>
    <div class="body">
      <div class="section-title">Personal Information</div>
      <div class="row"><span class="label">👤 Full Name</span><span class="value">${fullName}</span></div>
      <div class="divider"></div>
      <div class="row"><span class="label">📧 Email</span><span class="value"><a href="mailto:${email}" style="color:#002b5c;">${email}</a></span></div>
      <div class="divider"></div>
      <div class="row"><span class="label">📞 Phone</span><span class="value">${phone}</span></div>
      <div class="divider"></div>
      <div class="row"><span class="label">🎂 Age</span><span class="value">${age} years</span></div>
      <div class="divider"></div>
      <div class="row"><span class="label">🏙️ City</span><span class="value">${city}</span></div>
      <div class="section-title">Role & Availability</div>
      <div class="row"><span class="label">🙋 Role</span><span class="value">${role}</span></div>
      <div class="divider"></div>
      <div class="row"><span class="label">🕐 Availability</span><span class="value">${availability}</span></div>
      <div class="section-title">About the Applicant</div>
      <div><span class="label">📋 Prior Experience</span>
        <div class="textarea-val">${experience || 'Koi experience share nahi ki gayi.'}</div>
      </div><br/>
      <div><span class="label">💬 Motivation</span>
        <div class="textarea-val">${motivation}</div>
      </div>
    </div>
    <div class="footer">
      Volunteer Application Form se bheji gayi.<br/>
      Submitted on: <strong>${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</strong>
    </div>
  </div></body></html>`;

  try {
    await transporter.sendMail({
      from: '"Volunteer Form 🐾" <Agnipathfoods@gmail.com>',
      to: 'Agnipathfoods@gmail.com',
      replyTo: email,
      subject: `🐾 New Volunteer Application — ${fullName} (${role})`,
      html,
    });
    console.log(`✅ Volunteer email sent: ${fullName}`);
    return res.status(200).json({ success: true, message: 'Application successfully bheji gayi!' });
  } catch (err) {
    console.error('❌ Volunteer email error:', err.message);
    return res.status(500).json({ success: false, message: 'Email bhejne mein error aaya.' });
  }
});


// ══════════════════════════════════════════════════════════════════════════════
//  2️⃣  POST /api/contact
// ══════════════════════════════════════════════════════════════════════════════
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ success: false, message: 'Saare required fields bharo.' });
  }

  const subjectLabels = {
    adoption:     '🐶 Dog Adoption',
    donation:     '💛 Donations',
    volunteering: '🙋 Volunteering',
    surrender:    '🏠 Dog Surrender',
    general:      '📋 General Enquiry',
  };
  const subjectLabel = subjectLabels[subject] || subject;

  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"/>
  <style>
    body{font-family:'Segoe UI',Arial,sans-serif;background:#f4f6fb;margin:0;padding:0;}
    .wrapper{max-width:620px;margin:30px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 8px 30px rgba(0,43,92,.12);}
    .header{background:#002b5c;padding:32px 36px;text-align:center;}
    .header h1{color:#ffd100;font-size:1.8rem;margin:0 0 6px;}
    .header p{color:rgba(255,255,255,.75);font-size:.9rem;margin:0;}
    .badge{display:inline-block;background:#ffd100;color:#002b5c;font-size:.75rem;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;padding:4px 14px;border-radius:20px;margin-bottom:12px;}
    .body{padding:32px 36px;}
    .section-title{font-size:.75rem;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#002b5c;border-left:4px solid #ffd100;padding-left:10px;margin:24px 0 14px;}
    .row{display:flex;margin-bottom:12px;}
    .label{min-width:160px;font-weight:600;color:#444;font-size:.88rem;}
    .value{color:#222;font-size:.88rem;flex:1;}
    .msg-box{background:#f8f9ff;border-radius:8px;padding:16px;color:#333;font-size:.9rem;line-height:1.7;white-space:pre-wrap;margin-top:8px;}
    .divider{height:1px;background:#eef0f7;margin:8px 0;}
    .subject-pill{display:inline-block;background:#ffd100;color:#002b5c;font-weight:700;font-size:.82rem;padding:4px 14px;border-radius:20px;}
    .footer{background:#f8f9ff;padding:20px 36px;text-align:center;color:#999;font-size:.8rem;border-top:1px solid #eee;}
    .footer strong{color:#002b5c;}
  </style></head><body>
  <div class="wrapper">
    <div class="header">
      <span class="badge">New Contact Enquiry</span>
      <h1>📬 New Message Received</h1>
      <p>Website contact form se ek naya message aaya hai</p>
    </div>
    <div class="body">
      <div class="section-title">Sender Details</div>
      <div class="row"><span class="label">👤 Name</span><span class="value">${name}</span></div>
      <div class="divider"></div>
      <div class="row"><span class="label">📧 Email</span><span class="value"><a href="mailto:${email}" style="color:#002b5c;">${email}</a></span></div>
      <div class="divider"></div>
      <div class="row"><span class="label">📞 Phone</span><span class="value">${phone || 'Not provided'}</span></div>
      <div class="divider"></div>
      <div class="row"><span class="label">📌 Subject</span><span class="value"><span class="subject-pill">${subjectLabel}</span></span></div>
      <div class="section-title">Message</div>
      <div class="msg-box">${message}</div>
    </div>
    <div class="footer">
      Contact Form se bheji gayi.<br/>
      Received on: <strong>${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</strong>
    </div>
  </div></body></html>`;

  try {
    await transporter.sendMail({
      from: '"Contact Form 📬" <Agnipathfoods@gmail.com>',
      to: 'Agnipathfoods@gmail.com',
      replyTo: email,
      subject: `📬 New Contact: ${subjectLabel} — ${name}`,
      html,
    });
    console.log(`✅ Contact email sent: ${name}`);
    return res.status(200).json({ success: true, message: 'Message successfully bheja gaya!' });
  } catch (err) {
    console.error('❌ Contact email error:', err.message);
    return res.status(500).json({ success: false, message: 'Email bhejne mein error aaya.' });
  }
});


// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/', (req, res) => res.send('🐾 API running! Routes: /api/volunteer | /api/contact'));

// ─── Start Server ─────────────────────────────────────────────────────────────
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));