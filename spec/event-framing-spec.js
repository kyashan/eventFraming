

describe('Function registration', function () {


    // var Player = require('../../lib/jasmine_examples/Player');
    // var Song = require('../../lib/jasmine_examples/Song');
    var evtFrm,
        firstKey,
        secondKey;

    beforeEach(function() {
        evtFrm = eventFraming;
    });

    it('Store a function and retrieve run function', function () {
        function first(){};
        firstKey = expect(evtFrm.register(first))
        firstKey.toEqual(jasmine.any(Function));
    });

    it('Store object different than a function and retrieves an error', function () {
        var noFn = 'no-function';
        expect(evtFrm.register(noFn)).toEqual(jasmine.error);
    });

    it('', function() {
        
    });


});
