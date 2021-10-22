const router = require('express').Router();

const renderCreate = (req, res) => {
  res.render('hotel/create');
};

router.get('/create', renderCreate);

module.exports = router;
