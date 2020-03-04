const express = require('express');

const demandsRoutes = express.Router();
const authMiddleware = require('../../MiddleWares/auth');

demandsRoutes.use(authMiddleware);

demandsRoutes.get("/demands",(req, res) => {
    res.status(200).send({message: "GET DEMANDS"});
});


module.exports = demandsRoutes;