module.exports = function (req, res, next) {
    res.header('access-control-allow-origin', 'https://testtheirmightheroku.herokuapp.com/');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('access-control-allow-methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('access-control-allow-headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, content-type, application/json');
    next();
  };
