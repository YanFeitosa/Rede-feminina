import mongoose from 'mongoose';

const contactSectionSchema = new mongoose.Schema({
  contactMethods: [{
    type: {
      type: String,
      enum: ['email', 'phone', 'address'],
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    info: {
      type: String,
      required: true
    },
    order: {
      type: Number,
      default: 0
    }
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.model('ContactSection', contactSectionSchema);