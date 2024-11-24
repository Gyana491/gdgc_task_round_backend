const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

// GET all listings
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('listings')
      .select('*');

    if (error) throw error;

    res.json({ data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET single listing
router.get('/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Listing not found' });

    res.json({ data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST new listing
router.post('/', async (req, res) => {
  try {
    const { title, description, seller, rating } = req.body;
    
    if (!title || !description || !seller) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const { data, error } = await supabase
      .from('listings')
      .insert([
        { title, description, seller, rating: rating || 0 }
      ])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({ data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update listing
router.put('/:id', async (req, res) => {
  try {
    const { title, description, rating } = req.body;
    const updates = {};
    
    if (title) updates.title = title;
    if (description) updates.description = description;
    if (rating !== undefined) updates.rating = rating;

    const { data, error } = await supabase
      .from('listings')
      .update(updates)
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Listing not found' });

    res.json({ data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE listing
router.delete('/:id', async (req, res) => {
  try {
    const { error } = await supabase
      .from('listings')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;

    res.status(200).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 