const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const commander = require('commander');

commander
    .version('0.1.0')
    .option('-b, --build [type]', 'Set the build type')
    .parse(process.argv);

const privateKey = fs.readFileSync('server/key.pem').toString();
const certificate = fs.readFileSync('server/cert.pem').toString();
const credentials = { key: privateKey, cert: certificate };

const app = express();


// Setup logger
app.use(
    morgan(
        ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms',
    ),
);

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'dist', commander.build)));

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'dist', commander.build, 'index.html'));
});

const httpsServer = https.createServer(credentials, app);
httpsServer.listen(8081);

const httpServer = http.createServer(app);
httpServer.listen(8080);

console.log('-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-');
console.log('🌐  Application is listening on port 8080 (http) and 8081 (https)');
console.log('-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-');