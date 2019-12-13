var express = require('express');
var router = express.Router();
const saveMyMoney = require('../saveMyMoney')


/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('hello')
} )
router.post('/', function (req, res, next) {
  let body = req.body;
  console.log('body', body)
  let numberOfBars = body.numberOfBars;
  const pricesOfBarPacketBox = body.pricesOfBarPacketBox;
  const quantityOfBarPacketBox = body.quantitiesOfBarPacketBox;

  function calculateBars(bars, barPacket) {
    return bars % barPacket;
  }

  function calculateNumberOfPacks(bars, packet) {
    return Math.floor(bars / packet);
  }

  function calculateNumberOfBoxes(numOfPack, boxes) {
    let box = Math.floor(boxes / 12);
    return Math.floor(numOfPack / box);
  }

  function calculateTotalCost(numOfBars, numOfPack, numOfBoxes, prices) {
    let packet = numOfPack;
    if (numOfBoxes > 0) {
      packet = numOfPack - 10;
    }
    let cost = (numOfBars * prices[0]) + (packet * prices[1]) + (numOfBoxes * prices[2]);
    return cost;
  }

  function saveMyMoney(numberOfBars, pricesOfBarPacketBox, quantityOfBarPacketBox) {

    let numOfBars = calculateBars(numberOfBars, quantityOfBarPacketBox[1]);
    let numOfPack = calculateNumberOfPacks(numberOfBars, quantityOfBarPacketBox[1]);
    let numOfBoxes = calculateNumberOfBoxes(numOfPack, quantityOfBarPacketBox[2]);
    let cost = calculateTotalCost(numOfBars, numOfPack, numOfBoxes, pricesOfBarPacketBox);

    let payload = {
      "numberOfBars": numOfBars,
      "numberOfPacks": numOfPack,
      "numberOfBoxes": numOfBoxes,
      "totalCost": cost
    }
    return payload;
  }

  let response = saveMyMoney(numberOfBars, pricesOfBarPacketBox, quantityOfBarPacketBox);
  res.send(response)
});

module.exports = router;
