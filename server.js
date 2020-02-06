const http = require('http')
const url = require('url');
const sgMail = require('@sendgrid/mail');
// console.log(http);

const server = http.createServer(function (req, res) {
    var ip = req.connection.remoteAddress || req.socket.remoteAddress || req.headers['x-forwarded-for'];
    if (ip != '127.0.0.1') {

        console.log('bad connection', ip)
        res.writeHead('421')
        server.close()

    }
    else {

        if (req.method == 'POST') {
            console.log("connected")
            console.log("********************************")
            const queryObject = url.parse(req.url, true).query;
            console.log(queryObject)

            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            const msg = {
                to: 'shivankawasthi75091@gmail.com',
                from: queryObject.from,
                subject: queryObject.subject,
                text: queryObject.content,
                html: '<strong>' + queryObject.content + '</strong>',
            };
            console.log(msg)
            sgMail.send(msg);
            console.log("done")
        }
        else {
            console.log("----Method not match error -------------")
            console.log("--------terminating -----------------")
            res.writeHead('421')
            server.close()
        }


    }
    res.end()

})
server.listen(8080, '127.0.0.1')

server.on('connection', function (sok) {
    var ip = sok.remoteAddress
    console.log(ip)
})