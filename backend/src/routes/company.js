const express = require('express');
const router = express.Router();
const { User } = require('../models/user');

router.get('/no-company', async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        company_id: null,
      },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
