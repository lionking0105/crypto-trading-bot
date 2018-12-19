let assert = require('assert');
let resmaple = require('../../utils/resample');

let fs = require('fs');

describe('#resample of candles', function() {
    it('should resample 1 hour candles', function() {
        let candles = resmaple.resampleMinutes(createCandleFixtures(), 60)

        let firstFullCandle = candles[1]

        assert.equal(12, firstFullCandle['_candle_count'])

        assert.equal(firstFullCandle['time'], 1533142800)
        assert.equal(firstFullCandle['open'], 7598.5)
        assert.equal(firstFullCandle['high'], 7609.5)
        assert.equal(firstFullCandle['low'], 7530)
        assert.equal(firstFullCandle['close'], 7557)
        assert.equal(firstFullCandle['volume'], 170512826)

        assert.equal(candles[2]['time'], 1533139200)
    });

    it('should resample 15m candles', function() {
        let candles = resmaple.resampleMinutes(createCandleFixtures(), 15)

        let firstFullCandle = candles[1]

        assert.equal(3, firstFullCandle['_candle_count'])

        assert.equal(firstFullCandle['time'], 1533142800)
        assert.equal(firstFullCandle['open'], 7545.5)
        assert.equal(firstFullCandle['high'], 7557)
        assert.equal(firstFullCandle['low'], 7530)
        assert.equal(firstFullCandle['close'], 7557)
        assert.equal(firstFullCandle['volume'], 57004287)

        assert.equal(candles[2]['time'], 1533141900)
    });

    it('should format period based on unit', function() {
        assert.equal(resmaple.convertPeriodToMinute('15m'), 15)
        assert.equal(resmaple.convertPeriodToMinute('30M'), 30)
        assert.equal(resmaple.convertPeriodToMinute('1H'), 60)
        assert.equal(resmaple.convertPeriodToMinute('2h'), 120)
        assert.equal(resmaple.convertPeriodToMinute('1w'), 10080)
        assert.equal(resmaple.convertPeriodToMinute('2w'), 20160)
        assert.equal(resmaple.convertPeriodToMinute('1y'), 3588480)
    });

    let createCandleFixtures = function() {
        return JSON.parse(fs.readFileSync(__dirname + '/fixtures/xbt-usd-5m.json', 'utf8'));
    }
});
