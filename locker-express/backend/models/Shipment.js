const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  receiverName: String,
  receiverPhone: String,
  fromAddress: String,
  toAddress: String,
  service: String,
  status: { type: String, default: 'created' }
}, { timestamps: true });

module.exports = mongoose.model('Shipment', shipmentSchema);
