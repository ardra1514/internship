// // server/Models/DistributedList.js
// import mongoose from 'mongoose';

// const itemSchema = new mongoose.Schema({
//   FirstName: String,
//   Phone: String,
//   Notes: String,
// });

// const distributedListSchema = new mongoose.Schema({
//   agent: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' },
//   items: [itemSchema],
// });

// export default mongoose.model('DistributedList', distributedListSchema);


// server/Models/DistributedList.js
import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  FirstName: String,
  Phone: String,
  Notes: String,
});

const distributedListSchema = new mongoose.Schema({
  agent: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' },
  items: [itemSchema],
});

export default mongoose.model('DistributedList', distributedListSchema);
