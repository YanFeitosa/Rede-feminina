import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import logger from '../utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, '../../data');
const dataFile = path.join(dataDir, 'data.json');

const defaultData = {
  users: [],
  hero: null,
  services: null,
  pricing: null,
  contact: null
};

async function ensureDir() {
  await fs.mkdir(dataDir, { recursive: true });
}

async function loadData() {
  try {
    await ensureDir();
    const raw = await fs.readFile(dataFile, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    if (err.code === 'ENOENT') {
      await saveData(defaultData);
      return { ...defaultData };
    }
    throw err;
  }
}

async function saveData(data) {
  await ensureDir();
  await fs.writeFile(dataFile, JSON.stringify(data, null, 2), 'utf-8');
}

// USER FUNCTIONS
export async function getUserByEmail(email) {
  const data = await loadData();
  return data.users.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
}

export async function createUser({ email, password, role = 'admin' }) {
  const data = await loadData();
  const existing = data.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) return existing;
  const salt = await bcrypt.genSalt(12);
  const hash = await bcrypt.hash(password, salt);
  const user = {
    id: crypto.randomUUID(),
    email: email.toLowerCase(),
    password: hash,
    role,
    lastLogin: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  data.users.push(user);
  await saveData(data);
  return user;
}

export async function updateUser(user) {
  const data = await loadData();
  const idx = data.users.findIndex(u => u.id === user.id);
  if (idx !== -1) {
    user.updatedAt = new Date().toISOString();
    data.users[idx] = user;
    await saveData(data);
  }
  return user;
}

export async function getUserById(id) {
  const data = await loadData();
  return data.users.find(u => u.id === id) || null;
}

export async function ensureDefaultAdmin() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) return;
  const existing = await getUserByEmail(email);
  if (!existing) {
    await createUser({ email, password, role: 'admin' });
  logger.log('✅ Default admin user (file DB) created');
  } else {
  logger.log('✅ Admin user (file DB) already exists');
  }
}

// Helper to return safe user object (without password)
export function sanitizeUser(user) {
  if (!user) return null;
  const { password, ...rest } = user;
  return rest;
}

// PASSWORD
export async function comparePassword(user, candidate) {
  return bcrypt.compare(candidate, user.password);
}

export async function changePassword(user, newPassword) {
  const data = await loadData();
  const idx = data.users.findIndex(u => u.id === user.id);
  if (idx === -1) return;
  const salt = await bcrypt.genSalt(12);
  data.users[idx].password = await bcrypt.hash(newPassword, salt);
  data.users[idx].updatedAt = new Date().toISOString();
  await saveData(data);
}

// SECTIONS (generic helpers)
async function getSection(key) {
  const data = await loadData();
  return data[key];
}

async function saveSection(key, value) {
  const data = await loadData();
  data[key] = { ...value, updatedAt: new Date().toISOString() };
  if (!data[key].createdAt) data[key].createdAt = new Date().toISOString();
  await saveData(data);
  return data[key];
}

// HERO
export async function getHero() {
  let hero = await getSection('hero');
  if (!hero) {
    hero = {
      title: 'Juntos por vidas',
      subtitle: 'mais fortes',
      description: 'Acolhimento, prevenção e esperança para quem enfrenta o câncer. Faça parte dessa rede de apoio, participe das ações e conheça o Bazar solidário.',
      buttonText: 'Contribua',
      buttonLink: '#',
      images: [],
      isActive: true
    };
    hero = await saveSection('hero', hero);
  }
  return hero;
}

export async function updateHero(data) {
  const existing = await getHero();
  return saveSection('hero', { ...existing, ...data });
}

// SERVICES
export async function getServices() {
  let services = await getSection('services');
  if (!services) {
    services = {
      title: 'Nossos Serviços',
      description: 'Conheça as ações e serviços que oferecemos.',
      buttonText: 'Conheça o Bazar',
      buttonLink: '#',
      isActive: true
    };
    services = await saveSection('services', services);
  }
  return services;
}

export async function updateServices(data) {
  const existing = await getServices();
  return saveSection('services', { ...existing, ...data });
}

// PRICING (Doações)
export async function getPricing() {
  let pricing = await getSection('pricing');
  if (!pricing) {
    pricing = {
      sectionSubtitle: 'Doe',
      title: 'Ajude nossa causa',
      description: 'Sua contribuição mantém nossos projetos.',
      donationTitle: 'Doação',
      donationDescription: 'Cada gesto conta.',
      donationCardTitle: 'PIX',
      donationCardDescription: 'Use a chave para doar.',
      buttonText: 'Doar agora',
      buttonLink: '#',
      pixKey: '',
      bankInfo: {},
      isActive: true
    };
    pricing = await saveSection('pricing', pricing);
  }
  return pricing;
}

export async function updatePricing(data) {
  const existing = await getPricing();
  return saveSection('pricing', { ...existing, ...data });
}

// CONTACT
export async function getContact() {
  let contact = await getSection('contact');
  if (!contact) {
    contact = {
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
      ],
      isActive: true
    };
    contact = await saveSection('contact', contact);
  }
  return contact;
}

export async function updateContact(data) {
  const existing = await getContact();
  return saveSection('contact', { ...existing, ...data });
}

// AGGREGATE
export async function getAllContent() {
  const [hero, services, pricing, contact] = await Promise.all([
    getHero(),
    getServices(),
    getPricing(),
    getContact()
  ]);
  return { hero, services, pricing, contact };
}

export async function initFileStore() {
  await loadData();
  await ensureDefaultAdmin();
  logger.log('🗂️ File storage initialized');
}
