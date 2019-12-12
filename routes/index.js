var express = require('express');
var router = express.Router();
const saveMyMoney = require('../saveMyMoney')

/* GET home page. */
router.get('/', function (req, res, next) {

  let numberOfBars = 17;
  const pricesOfBarPacketBox = [2.30, 25, 230];
  const quantityOfBarPacketBox = [1, 12, 12 * 10];

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
  }

  saveMyMoney(numberOfBars, pricesOfBarPacketBox, quantityOfBarPacketBox)
});

module.exports = router;
