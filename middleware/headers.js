module.exports = function (req, res, next) {
    if (req.method == "OPTIONS"){
    res.header('access-control-allow-origin', 'https://localhost:3000');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('access-control-allow-methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('access-control-allow-headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Max-Age', '86400');
    }
    next();
  };
