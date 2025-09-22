import mongoose from 'mongoose';

const servicesSectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: 'Transformamos dor em força'
  },
  description: {
    type: String,
    required: true,
    default: 'Acolhimento, informação e esperança para quem enfrenta o câncer. Descubra nossos serviços, participe das ações e faça parte dessa rede de apoio e solidariedade.'
  },
  buttonText: {
    type: String,
    required: true,
    default: 'Bazar solidário'
  },
  buttonLink: {
    type: String,
    default: 'https://rede-feminina-colab.onrender.com/'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.model('ServicesSection', servicesSectionSchema);