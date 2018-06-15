const crypto = require('crypto').randomBytes(256).toString('hex');


module.exports = {
    uri: `mongodb://micsta13:secretpassword23@ds016098.mlab.com:16098/sealcode-messenger`,
    secret: crypto,
    db: 'sealcode-messenger',
}