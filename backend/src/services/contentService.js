import HeroSection from '../models/HeroSection.js';
import ServicesSection from '../models/ServicesSection.js';
import PricingSection from '../models/PricingSection.js';
import ContactSection from '../models/ContactSection.js';
import {
  getHero as fsGetHero,
  updateHero as fsUpdateHero,
  getServices as fsGetServices,
  updateServices as fsUpdateServices,
  getPricing as fsGetPricing,
  updatePricing as fsUpdatePricing,
  getContact as fsGetContact,
  updateContact as fsUpdateContact,
  getAllContent as fsGetAllContent
} from '../storage/fileStore.js';

const useFile = process.env.USE_FILE_DB === 'true';

// HERO
export async function getHero() {
  if (useFile) return fsGetHero();
  let hero = await HeroSection.findOne({ isActive: true });
  if (!hero) {
    hero = new HeroSection({});
    await hero.save();
  }
  return hero;
}

export async function updateHero(data) {
  if (useFile) return fsUpdateHero(data);
  let hero = await HeroSection.findOne({ isActive: true });
  if (!hero) hero = new HeroSection(data); else Object.assign(hero, data);
  await hero.save();
  return hero;
}

// SERVICES
export async function getServices() {
  if (useFile) return fsGetServices();
  let services = await ServicesSection.findOne({ isActive: true });
  if (!services) { services = new ServicesSection({}); await services.save(); }
  return services;
}

export async function updateServices(data) {
  if (useFile) return fsUpdateServices(data);
  let services = await ServicesSection.findOne({ isActive: true });
  if (!services) services = new ServicesSection(data); else Object.assign(services, data);
  await services.save();
  return services;
}

// PRICING
export async function getPricing() {
  if (useFile) return fsGetPricing();
  let pricing = await PricingSection.findOne({ isActive: true });
  if (!pricing) { pricing = new PricingSection({}); await pricing.save(); }
  return pricing;
}

export async function updatePricing(data) {
  if (useFile) return fsUpdatePricing(data);
  let pricing = await PricingSection.findOne({ isActive: true });
  if (!pricing) pricing = new PricingSection(data); else Object.assign(pricing, data);
  await pricing.save();
  return pricing;
}

// CONTACT
export async function getContact() {
  if (useFile) return fsGetContact();
  let contact = await ContactSection.findOne({ isActive: true });
  if (!contact) { contact = new ContactSection({}); await contact.save(); }
  return contact;
}

export async function updateContact(data) {
  if (useFile) return fsUpdateContact(data);
  let contact = await ContactSection.findOne({ isActive: true });
  if (!contact) contact = new ContactSection(data); else Object.assign(contact, data);
  await contact.save();
  return contact;
}

export async function getAll() {
  if (useFile) return fsGetAllContent();
  const [hero, services, pricing, contact] = await Promise.all([
    HeroSection.findOne({ isActive: true }),
    ServicesSection.findOne({ isActive: true }),
    PricingSection.findOne({ isActive: true }),
    ContactSection.findOne({ isActive: true })
  ]);
  return { hero: hero || {}, services: services || {}, pricing: pricing || {}, contact: contact || {} };
}
