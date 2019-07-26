
const error = (err, req, res, next) => {
    //logging error  library winston is one option

    res.status(500).send(err.message);
}

module.exports = error;