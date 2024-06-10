const express = require('express');
const app = express();
const http = require('http');
const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type’, application/json');
    res.end(JSON.stringify({mensagem : "teste"}));
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

app.get("/produto", (request, response) => {
    return response.json({ mensagem: "teste" });
})

app.listen(3001, () => console.log('server running on port 3001'));