const Blinkt = require('node-blinkt');
const leds = new Blinkt();
const colorsys = require('colorsys');

leds.setup();
leds.clearAll();
leds.setAllPixels(0, 156, 0, 0.1);
leds.sendUpdate();

const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => res.send('Hello World!'));

app.put('/led', function(req, res) {
    let led = req.get('led');
    let ledValue = req.get('ledValue');
    const rgb = colorsys.hsvToRgb(Number(ledValue)*32.7, 100.0, 100.0);
    leds.setPixel(led, rgb.r, rgb.g, rgb.b, 0.1);
    leds.sendUpdate();

    console.log(`The values ${led} and ${ledValue} where sent`);
    return res.send(`The values ${led} and ${ledValue} where sent`);
});

app.listen(port,function() {
    leds.setup();
    leds.clearAll();
    console.log(`Example app listening on port ${port}!`)
});
