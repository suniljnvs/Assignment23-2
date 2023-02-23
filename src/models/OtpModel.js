const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  otp: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: {expires: 300}
  },
}, { timestamps: true });

module.exports = mongoose.model('Otp', otpSchema);


