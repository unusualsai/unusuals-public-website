#!/usr/bin/env node
const { spawn } = require("child_process");
const serve = spawn(`${__dirname}/node_modules/.bin/http-server`, [`${__dirname}/docs`]);

serve.stdout.on("data", data => {
    console.log(`${data}`);
});

serve.stderr.on("data", data => {
    console.log(`error: ${data}`);
});

serve.on('error', (error) => {
    console.log(`error: ${error.message}`);
});

serve.on("close", code => {
    console.log(`Serving process exited with code ${code}`);
});