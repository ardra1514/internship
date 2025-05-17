import mongoose from 'mongoose';

const agentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  pNo: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'agent' } // optional
});







export default mongoose.model('Agent', agentSchema);
