const http = require('http')
// console.log(http);

const server = http.createServer(function (req, res) {
    var ip = req.connection.remoteAddress
    if (ip != '127.0.0.1') {
        console.log('bad connection', ip)
        res.writeHead('421')
        server.close()

    }
    else {
        console.log("connected")
        console.log("********************************")
        res.write("hi")
        res.writeHead('200', { 'Content-Type': 'text/html' })

    }
    res.end()

})
server.listen(8080, '192.168.1.149')

server.on('connection', function (sok) {
    var ip = sok.remoteAddress
    console.log(ip)
})