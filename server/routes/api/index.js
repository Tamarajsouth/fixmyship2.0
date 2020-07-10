const router = require('express').Router();
const userRoutes = require('./user-routes');

router.use('/users', userRoutes);


router.use((req, res) => {
    res.sendFile(path.join())
})
module.exports = router;
