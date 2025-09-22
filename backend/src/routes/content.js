import express from 'express';
import Joi from 'joi';
import { getHero, updateHero, getServices, updateServices, getPricing, updatePricing, getContact, updateContact, getAll } from '../services/contentService.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Helper to strip fields we never want to accept from client (timestamps / ids)
function sanitizePayload(body) {
  if (!body || typeof body !== 'object') return body;
  const { updatedAt, createdAt, _id, __v, id, ...rest } = body; // drop these
  // Also sanitize nested arrays/objects that might carry timestamps (e.g., images, contactMethods)
  if (Array.isArray(rest.images)) {
    rest.images = rest.images.map(img => {
      if (img && typeof img === 'object') {
        const { updatedAt: iu, createdAt: ic, _id: iid, __v: iv, ...iRest } = img;
        return iRest;
      }
      return img;
    });
  }
  if (Array.isArray(rest.contactMethods)) {
    rest.contactMethods = rest.contactMethods.map(m => {
      if (m && typeof m === 'object') {
        const { updatedAt: mu, createdAt: mc, _id: mid, __v: mv, id: mid2, ...mRest } = m;
        return mRest;
      }
      return m;
    });
  }
  if (rest.bankInfo && typeof rest.bankInfo === 'object') {
    const { updatedAt: bu, createdAt: bc, _id: bid, __v: bv, id: bid2, ...bRest } = rest.bankInfo;
    rest.bankInfo = bRest;
  }
  return rest;
}

// Validation schemas
const heroSectionSchema = Joi.object({
  title: Joi.string().required(),
  subtitle: Joi.string().required(),
  description: Joi.string().required(),
  buttonText: Joi.string().required(),
  buttonLink: Joi.string().allow(''),
  images: Joi.array().items(Joi.object({
    url: Joi.string().required(),
    alt: Joi.string().required(),
    order: Joi.number()
  })),
  isActive: Joi.boolean()
});

const servicesSectionSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  buttonText: Joi.string().required(),
  buttonLink: Joi.string().allow(''),
  isActive: Joi.boolean()
});

const pricingSectionSchema = Joi.object({
  sectionSubtitle: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  donationTitle: Joi.string().required(),
  donationDescription: Joi.string().required(),
  donationCardTitle: Joi.string().required(),
  donationCardDescription: Joi.string().required(),
  buttonText: Joi.string().required(),
  buttonLink: Joi.string().allow(''),
  pixKey: Joi.string().allow(''),
  bankInfo: Joi.object({
    bank: Joi.string().allow(''),
    agency: Joi.string().allow(''),
    account: Joi.string().allow(''),
    accountHolder: Joi.string().allow('')
  }),
  isActive: Joi.boolean()
});

const contactSectionSchema = Joi.object({
  contactMethods: Joi.array().items(Joi.object({
    type: Joi.string().valid('email', 'phone', 'address').required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    info: Joi.string().required(),
    order: Joi.number()
  })),
  isActive: Joi.boolean()
});

// ==== HERO SECTION ====

// @route   GET /api/content/hero
// @desc    Get hero section content
// @access  Public
router.get('/hero', async (req, res) => {
  try {
    const heroSection = await getHero();
    res.json(heroSection);
  } catch (error) {
    console.error('Get hero section error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/content/hero
// @desc    Update hero section content
// @access  Private (Admin only)
router.put('/hero', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const payload = sanitizePayload(req.body);
    const { error } = heroSectionSchema.validate(payload);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const updated = await updateHero(payload);
    res.json({ message: 'Hero section updated successfully', data: updated });
  } catch (error) {
    console.error('Update hero section error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ==== SERVICES SECTION ====

// @route   GET /api/content/services
// @desc    Get services section content
// @access  Public
router.get('/services', async (req, res) => {
  try {
    const servicesSection = await getServices();
    res.json(servicesSection);
  } catch (error) {
    console.error('Get services section error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/content/services
// @desc    Update services section content
// @access  Private (Admin only)
router.put('/services', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const payload = sanitizePayload(req.body);
    const { error } = servicesSectionSchema.validate(payload);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const updated = await updateServices(payload);
    res.json({ message: 'Services section updated successfully', data: updated });
  } catch (error) {
    console.error('Update services section error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ==== PRICING SECTION ====

// @route   GET /api/content/pricing
// @desc    Get pricing section content
// @access  Public
router.get('/pricing', async (req, res) => {
  try {
    const pricingSection = await getPricing();
    res.json(pricingSection);
  } catch (error) {
    console.error('Get pricing section error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/content/pricing
// @desc    Update pricing section content
// @access  Private (Admin only)
router.put('/pricing', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const payload = sanitizePayload(req.body);
    const { error } = pricingSectionSchema.validate(payload);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const updated = await updatePricing(payload);
    res.json({ message: 'Pricing section updated successfully', data: updated });
  } catch (error) {
    console.error('Update pricing section error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ==== CONTACT SECTION ====

// @route   GET /api/content/contact
// @desc    Get contact section content
// @access  Public
router.get('/contact', async (req, res) => {
  try {
    const contactSection = await getContact();
    res.json(contactSection);
  } catch (error) {
    console.error('Get contact section error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/content/contact
// @desc    Update contact section content
// @access  Private (Admin only)
router.put('/contact', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const payload = sanitizePayload(req.body);
    const { error } = contactSectionSchema.validate(payload);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const updated = await updateContact(payload);
    res.json({ message: 'Contact section updated successfully', data: updated });
  } catch (error) {
    console.error('Update contact section error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ==== GET ALL CONTENT ====

// @route   GET /api/content/all
// @desc    Get all sections content
// @access  Public
router.get('/all', async (req, res) => {
  try {
    const data = await getAll();
    res.json(data);
  } catch (error) {
    console.error('Get all content error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;