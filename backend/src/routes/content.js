import express from 'express';
import Joi from 'joi';
import HeroSection from '../models/HeroSection.js';
import ServicesSection from '../models/ServicesSection.js';
import PricingSection from '../models/PricingSection.js';
import ContactSection from '../models/ContactSection.js';
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
    let heroSection = await HeroSection.findOne({ isActive: true });
    
    if (!heroSection) {
      // Create default hero section if none exists
      heroSection = new HeroSection({});
      await heroSection.save();
    }

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

    let heroSection = await HeroSection.findOne({ isActive: true });
    
    if (!heroSection) {
      heroSection = new HeroSection(req.body);
    } else {
      Object.assign(heroSection, req.body);
    }

    await heroSection.save();
    res.json({ message: 'Hero section updated successfully', data: heroSection });
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
    let servicesSection = await ServicesSection.findOne({ isActive: true });
    
    if (!servicesSection) {
      servicesSection = new ServicesSection({});
      await servicesSection.save();
    }

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

    let servicesSection = await ServicesSection.findOne({ isActive: true });
    
    if (!servicesSection) {
      servicesSection = new ServicesSection(req.body);
    } else {
      Object.assign(servicesSection, req.body);
    }

    await servicesSection.save();
    res.json({ message: 'Services section updated successfully', data: servicesSection });
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
    let pricingSection = await PricingSection.findOne({ isActive: true });
    
    if (!pricingSection) {
      pricingSection = new PricingSection({});
      await pricingSection.save();
    }

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

    let pricingSection = await PricingSection.findOne({ isActive: true });
    
    if (!pricingSection) {
      pricingSection = new PricingSection(req.body);
    } else {
      Object.assign(pricingSection, req.body);
    }

    await pricingSection.save();
    res.json({ message: 'Pricing section updated successfully', data: pricingSection });
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
    let contactSection = await ContactSection.findOne({ isActive: true });
    
    if (!contactSection) {
      // Create default contact section
      contactSection = new ContactSection({
        contactMethods: [
          {
            type: 'email',
            title: 'E-mail',
            description: 'Mande sua mensagem, queremos ouvir você.',
            info: 'contato@redefeminina.org',
            order: 1
          },
          {
            type: 'phone',
            title: 'Telefone',
            description: 'Segunda a quinta: 8h às 17h\nSexta: 7h às 12:30h\nSábado e domingo: fechado',
            info: '(083) 3241-5373',
            order: 2
          },
          {
            type: 'address',
            title: 'Endereço',
            description: 'Venha nos visitar e conhecer nosso espaço.',
            info: 'Av. Doze de Outubro, 858 -\nJaguaribe, João Pessoa',
            order: 3
          }
        ]
      });
      await contactSection.save();
    }

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

    let contactSection = await ContactSection.findOne({ isActive: true });
    
    if (!contactSection) {
      contactSection = new ContactSection(req.body);
    } else {
      Object.assign(contactSection, req.body);
    }

    await contactSection.save();
    res.json({ message: 'Contact section updated successfully', data: contactSection });
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
    const [hero, services, pricing, contact] = await Promise.all([
      HeroSection.findOne({ isActive: true }),
      ServicesSection.findOne({ isActive: true }),
      PricingSection.findOne({ isActive: true }),
      ContactSection.findOne({ isActive: true })
    ]);

    res.json({
      hero: hero || {},
      services: services || {},
      pricing: pricing || {},
      contact: contact || {}
    });
  } catch (error) {
    console.error('Get all content error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;