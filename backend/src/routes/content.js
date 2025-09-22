import express from 'express';
import Joi from 'joi';
import { getHero, updateHero, getServices, updateServices, getPricing, updatePricing, getContact, updateContact, getAll } from '../services/contentService.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

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
    const { error } = heroSectionSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const updated = await updateHero(req.body);
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
    const { error } = servicesSectionSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const updated = await updateServices(req.body);
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
    const { error } = pricingSectionSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const updated = await updatePricing(req.body);
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
    const { error } = contactSectionSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const updated = await updateContact(req.body);
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