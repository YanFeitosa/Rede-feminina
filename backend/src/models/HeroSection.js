import mongoose from 'mongoose';

const heroSectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: 'Juntos por vidas'
  },
  subtitle: {
    type: String,
    required: true,
    default: 'mais fortes'
  },
  description: {
    type: String,
    required: true,
    default: 'Acolhimento, prevenção e esperança para quem enfrenta o câncer. Faça parte dessa rede de apoio, participe das ações e conheça o Bazar solidário.'
  },
  buttonText: {
    type: String,
    required: true,
    default: 'Contribua'
  },
  buttonLink: {
    type: String,
    default: '#'
  },
  images: [{
    url: String,
    alt: String,
    order: Number
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.model('HeroSection', heroSectionSchema);