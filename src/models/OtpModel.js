const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

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
  otpcount :{
    type : Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: {expires: 300}
  },
}, { timestamps: true });

module.exports = mongoose.model('Otp', otpSchema);


