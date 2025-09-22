import mongoose from 'mongoose';

const pricingSectionSchema = new mongoose.Schema({
  sectionSubtitle: {
    type: String,
    required: true,
    default: 'SUA AJUDA FAZ A DIFERENÇA'
  },
  title: {
    type: String,
    required: true,
    default: 'Apoie. Inspire. Transforme vidas.'
  },
  description: {
    type: String,
    required: true,
    default: 'Faça uma doação única via Pix ou depósito bancário e ajude a transformar vidas. Juntos, somos mais fortes.'
  },
  donationTitle: {
    type: String,
    required: true,
    default: 'Doações Esporádicas'
  },
  donationDescription: {
    type: String,
    required: true,
    default: 'Faça uma doação única via Pix ou depósito bancário e ajude a transformar vidas.'
  },
  donationCardTitle: {
    type: String,
    required: true,
    default: 'Contribua de forma rápida e segura'
  },
  donationCardDescription: {
    type: String,
    required: true,
    default: 'Sua doação vai direto para quem mais precisa. Cada real faz a diferença na vida de quem enfrenta o câncer.'
  },
  buttonText: {
    type: String,
    required: true,
    default: 'Doar agora via Pix'
  },
  buttonLink: {
    type: String,
    default: '#'
  },
  pixKey: {
    type: String,
    default: ''
  },
  bankInfo: {
    bank: String,
    agency: String,
    account: String,
    accountHolder: String
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.model('PricingSection', pricingSectionSchema);