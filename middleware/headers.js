module.exports = function (req, res, next) {
    res.header('access-control-allow-origin', 'http://localhost:3000');
    //res.header("Access-Control-Allow-Credentials", true);
    res.header('access-control-allow-methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('access-control-allow-headers', 'Origin, X-Requested-With,, Access-Control-Allow-Headers, Content-Type, Accept, Authorization');
    res.header('Access-Control-Max-Age', '86400');
    next();
  };
