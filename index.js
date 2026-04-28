require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcryptjs');

const { sequelize, User, NavbarLink, About, SocialLink, Settings } = require('./models');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// ─── Middleware ─────────────────────────────────────────────────────────────
const allowedOrigins = [
  process.env.CLIENT_URL,
  'https://mdyasir.in',
  'http://mdyasir.in',
  'http://localhost:5173'
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ─── Routes ─────────────────────────────────────────────────────────────────
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/experience', require('./routes/experience'));
app.use('/api/achievements', require('./routes/achievements'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/navbar', require('./routes/navbar'));
app.use('/api/about', require('./routes/about'));
app.use('/api/social', require('./routes/social'));
app.use('/api/media', require('./routes/media'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/settings', require('./routes/settings'));

app.get('/api/health', (req, res) => res.json({ status: 'OK', message: 'Portfolio API running' }));

// ─── Error Handler ───────────────────────────────────────────────────────────
app.use(errorHandler);

// ─── Database Seed ───────────────────────────────────────────────────────────
const seedDatabase = async () => {
  // Admin user
  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();
  const existingAdmin = await User.findOne({ where: { email: adminEmail } });
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12);
    await User.create({ email: adminEmail, password: hashedPassword });
    console.log('✅ Admin user created');
  }

  // Default About
  const aboutCount = await About.count();
  if (aboutCount === 0) {
    await About.create({
      name: 'Mohammed Yasir',
      title: 'Full Stack Developer & UI/UX Enthusiast',
      bio: 'Passionate and creative Full Stack Developer with expertise in building modern web applications. I love transforming ideas into elegant digital experiences with clean code and stunning design.',
      profile_image: null,
      resume_link: null,
    });
  }

  // Default Settings
  const settingsCount = await Settings.count();
  if (settingsCount === 0) {
    const defaults = [
      { key: 'site_owner_name', value: 'Mohammed Yasir', label: 'Your Full Name', type: 'text' },
      { key: 'hero_greeting', value: 'Available for opportunities', label: 'Hero Greeting Text', type: 'text' },
      { key: 'hero_typing_words', value: 'Full Stack Developer,UI/UX Enthusiast,Problem Solver,Creative Coder', label: 'Hero Typing Words (comma separated)', type: 'text' },
      { key: 'hero_stat_projects', value: '15+', label: 'Projects Count (Hero)', type: 'text' },
      { key: 'hero_stat_years', value: '2+', label: 'Years of Experience (Hero)', type: 'text' },
      { key: 'hero_stat_technologies', value: '10+', label: 'Technologies Count (Hero)', type: 'text' },
      { key: 'footer_tagline', value: 'Building digital experiences with passion and precision.', label: 'Footer Tagline', type: 'textarea' },
      { key: 'github_url', value: 'https://github.com', label: 'GitHub URL', type: 'text' },
      { key: 'linkedin_url', value: 'https://linkedin.com', label: 'LinkedIn URL', type: 'text' },
    ];
    await Settings.bulkCreate(defaults);
    console.log('✅ Default settings seeded');
  }

  // Default Navbar Links
  const navCount = await NavbarLink.count();
  if (navCount === 0) {
    const links = [
      { label: 'Home', href: '#home', order_index: 1 },
      { label: 'About', href: '#about', order_index: 2 },
      { label: 'Experience', href: '#experience', order_index: 3 },
      { label: 'Projects', href: '#projects', order_index: 4 },
      { label: 'Achievements', href: '#achievements', order_index: 5 },
      { label: 'Courses', href: '#courses', order_index: 6 },
      { label: 'Contact', href: '#contact', order_index: 7 },
    ];
    await NavbarLink.bulkCreate(links);
  }

  // Default Social Links
  const socialCount = await SocialLink.count();
  if (socialCount === 0) {
    const socials = [
      { platform: 'Facebook', url: 'https://facebook.com', icon: 'facebook', is_active: true },
      { platform: 'Instagram', url: 'https://instagram.com', icon: 'instagram', is_active: true },
      { platform: 'Snapchat', url: 'https://snapchat.com', icon: 'snapchat', is_active: true },
      { platform: 'Phone', url: '+923001234567', icon: 'phone', is_active: true },
    ];
    await SocialLink.bulkCreate(socials);
  }
};

// ─── Start Server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;

sequelize.sync()
  .then(async () => {
    console.log('✅ MySQL Database connected and synced');
    await seedDatabase();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Database connection failed:', err.message);
    process.exit(1);
  });
