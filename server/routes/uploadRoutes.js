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
    // Step 1: Get all agents (limit to 5)
    const agents = await Agent.find().limit(5);
    if (agents.length === 0) return res.status(400).json({ message: 'No agents found' });

    // Step 2: Read CSV into array
    const results = [];
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', (row) => results.push(row))
      .on('end', async () => {
        const totalItems = results.length;
        const numAgents = agents.length;
        const baseItemsPerAgent = Math.floor(totalItems / numAgents);
        const remainder = totalItems % numAgents;

        let start = 0;
        for (let i = 0; i < numAgents; i++) {
          const extra = i < remainder ? 1 : 0;
          const count = baseItemsPerAgent + extra;
          const chunk = results.slice(start, start + count);
          start += count;

          await DistributedList.create({
            agent: agents[i]._id,
            items: chunk,
          });
        }

        fs.unlinkSync(req.file.path); // remove uploaded file
        res.json({ message: 'Tasks distributed and saved successfully' });
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Upload failed' });
  }
});

export default router;
