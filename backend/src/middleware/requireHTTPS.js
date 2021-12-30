const { NODE_ENV } = require("../util/config")

// https://stackoverflow.com/questions/8605720/how-to-force-ssl-https-in-express-js

const requireHTTPS = (request, response, next) => {
    // The 'x-forwarded-proto' check is for Heroku
    if (!request.secure && request.get('x-forwarded-proto') !== 'https' && NODE_ENV === "production") {
        return response.redirect('https://' + request.get('host') + request.url);
    }
    next();
}

module.exports = requireHTTPS