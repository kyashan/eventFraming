/**
 * eventFraming test
 */


describe('Function registration', function () {


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


});

describe('Function running', function () {

    var evtFrm,
        counter = 0,
        timeToWait = 1000;

    evtFrm = eventFraming;


    function _fn()   {
        counter++;
    }

    evtFrm.setTimer(timeToWait);

    var fn = evtFrm.register(_fn);

    beforeEach(function(done) {
        fn();
        setTimeout(function(){
            // fn();
            done();
        }, timeToWait - 2);
    });

    it('Check if function trigger after first timoeut', function() { 
        expect(counter).toBe(0);
    });

});
