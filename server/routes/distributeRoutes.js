
// import express from 'express';
// import multer from 'multer';
// import csv from 'csv-parser';
// import fs from 'fs';
// import Agent from '../Models/Agent.js';
// import DistributedList from '../Models/DistributedList.js';

// const router = express.Router();
// const upload = multer({ dest: 'uploads/' });

// router.post('/upload-csv', upload.single('file'), async (req, res) => {
//   try {
//     // Get exactly 5 agents from DB
//     const agents = await Agent.find().limit(5);
//     if (agents.length === 0) return res.status(400).json({ message: 'No agents found' });

//     // Parse CSV rows
//     const results = [];
//     fs.createReadStream(req.file.path)
//       .pipe(csv())
//       .on('data', (row) => results.push(row))
//       .on('end', async () => {
//         // Clear old distributed lists (optional)
//         await DistributedList.deleteMany({});

//         const totalItems = results.length;
//         const numAgents = agents.length;
//         const baseItemsPerAgent = Math.floor(totalItems / numAgents);
//         const remainder = totalItems % numAgents;

//         let start = 0;
//         for (let i = 0; i < numAgents; i++) {
//           const extra = i < remainder ? 1 : 0;
//           const count = baseItemsPerAgent + extra;
//           const chunk = results.slice(start, start + count);
//           start += count;

//           await DistributedList.create({
//             agent: agents[i]._id,
//             items: chunk,
//           });
//         }

//         fs.unlinkSync(req.file.path); // delete uploaded file
//         res.json({ message: 'Tasks distributed and saved successfully' });
//       });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Upload failed' });
//   }
// });

// // Get all distributed lists for frontend display
// router.get('/distributed-lists', async (req, res) => {
//   try {
//     const lists = await DistributedList.find({}).populate('agent', '-password');
//     res.json({ lists });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to fetch distributed lists' });
//   }
// });

// export default router;

import express from 'express';
import multer from 'multer';
import csv from 'csv-parser';
import fs from 'fs';
import Agent from '../Models/Agent.js';
import DistributedList from '../Models/DistributedList.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload-csv', upload.single('file'), async (req, res) => {
  try {
    const results = [];

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        // Delete the uploaded file immediately after reading
        fs.unlinkSync(req.file.path);

        const agents = await Agent.find();
        if (agents.length === 0) {
          return res.status(400).json({ message: 'No agents found' });
        }

        // Optionally clear old assignments
        await DistributedList.deleteMany({});

        const totalItems = results.length;
        const totalAgents = agents.length;

        const baseCount = Math.floor(totalItems / totalAgents); // Minimum per agent
        const remainder = totalItems % totalAgents; // Number of agents that get one extra item

        let startIndex = 0;

        for (let i = 0; i < totalAgents; i++) {
          // Determine how many items for this agent:
          // First 'remainder' agents get baseCount + 1, others get baseCount
          const count = i < remainder ? baseCount + 1 : baseCount;

          // Slice the exact chunk for this agent
          const itemsForAgent = results.slice(startIndex, startIndex + count);

          // Save to DB
          await DistributedList.create({
            agent: agents[i]._id,
            items: itemsForAgent,
          });

          // Update startIndex for next slice
          startIndex += count;
        }

        res.status(200).json({ message: 'Tasks distributed successfully' });
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/distributed-lists', async (req, res) => {
  try {
    const lists = await DistributedList.find({}).populate('agent', '-password');
    res.json({ lists });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch distributed lists' });
  }
});

export default router;
