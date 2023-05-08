const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});
app.get('/progress', async (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();
    for(let i = 0; i<=100; i++){
        await delay(1000)
        console.log(i);
        let progress = {id: i, progress: i+'%'};
        res.write(`id: ${i}\nevent: progress\ndata: ${JSON.stringify(progress)}\n\n`);
    }
});
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
});