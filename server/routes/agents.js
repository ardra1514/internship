


// server/routes/agentRoutes.js
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Agent from '../Models/Agent.js'; // Verify path

const router = express.Router();

// Register agent
router.post('/register', async (req, res) => {
  try {
    const { name, email, pNo, password } = req.body;

    const existing = await Agent.findOne({ email });
    if (existing) return res.status(400).json({ success: false, error: 'Agent already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAgent = new Agent({ name, email, pNo, password: hashedPassword });

    await newAgent.save();
    res.status(201).json({ success: true, message: 'Agent registered' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Agent login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const agent = await Agent.findOne({ email });
    if (!agent) return res.status(400).json({ success: false, error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, agent.password);
    if (!match) return res.status(400).json({ success: false, error: 'Invalid credentials' });

    const token = jwt.sign({ id: agent._id, role: 'agent' }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({
      success: true,
      user: {
        id: agent._id,
        name: agent.name,
        email: agent.email,
        role: 'agent',
      },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Get all agents
router.get('/', async (req, res) => {
  try {
    const agents = await Agent.find({}, '-password'); // exclude passwords
    res.json({ agents });
  } catch (error) {
    console.error('Error fetching agents:', error);
    res.status(500).json({ error: 'Failed to fetch agents' });
  }
});

// Delete agent by id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Agent.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Agent not found' });
    }
    res.status(200).json({ message: 'Agent deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error deleting agent' });
  }
});

export default router;
