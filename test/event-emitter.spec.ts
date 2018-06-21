import {JSEmitter} from '../src/index';
import {expect} from 'chai';
import {describe, it} from 'mocha';
import * as sinon from 'sinon';

class Test extends JSEmitter {

}

describe('When binding a callback to the on function', () => {


    it('should return hello world', (done) => {
        const tsTest = new Test();
        tsTest.on('test-key', result => {

            expect(result).to.equal('Hello World!');
            return done();
        });
        tsTest.emit('test-key', 'Hello World!')

    });

    it('should return an object', (done) => {
        const tsTest = new Test();
        tsTest.on('test-key', result => {

            expect(result).to.be.an('object');
            expect(result).to.have.property('message');
            expect(result.message).to.equal('Hello World!');
            return done();
        });
        tsTest.emit('test-key', {message: 'Hello World!'})

    });
});


describe('When binding a callback to the off function with only a key', () => {

    it('should remove the event', () => {
        const key = 'test-key';
        const tsTest = new Test();
        tsTest.on(key, () => {
        });
        tsTest.on(key, () => {
        });
        expect(tsTest.count).to.equal(1);
        tsTest.off(key);
        expect(tsTest.count).to.equal(0);

    });
});

describe('When binding and event to the off function with function reference', () => {

    it('should remove the event', () => {
        const key = 'test-key';
        const func1 = () => {
        };
        const func2 = () => {
        };
        const tsTest = new Test();
        tsTest.on(key, func1);
        tsTest.on(key, func2);
        expect(tsTest.count).to.equal(1);
        expect(tsTest.functionCount(key)).to.equal(2);

        tsTest.off(key, func1);
        expect(tsTest.count).to.equal(1);
        expect(tsTest.functionCount(key)).to.equal(1);
    });
});

describe('When binding a callback to the once function', () => {

    it('should remove the event after the first event is fired', () => {
        const key = 'test-key';
        const tsTest = new Test();
        tsTest.once(key, () => {
        });
        expect(tsTest.count).to.equal(1);
        tsTest.emit(key);
        expect(tsTest.count).to.equal(0);
    });
});


describe('When binding a callback to the many function', () => {

    it('should remove the event after 3 events are fired', () => {
        const key = 'test-key';
        const tsTest = new Test();
        tsTest.many(key, () => {
        }, 3);
        expect(tsTest.count).to.equal(1);
        tsTest.emit(key);
        expect(tsTest.count).to.equal(1);
        tsTest.emit(key);
        expect(tsTest.count).to.equal(1);
        tsTest.emit(key);
        expect(tsTest.count).to.equal(0);
    });
});

describe('When binding a callback to the offKey function', () => {

    it('should remove the event', () => {
        const key = 'test-key';
        const tsTest = new Test();
        tsTest.on(key, () => {
        });
        expect(tsTest.count).to.equal(1);
        tsTest.offKey(key);
        expect(tsTest.count).to.equal(0);
    });
});


describe('When binding a callback to the offAll function', () => {

    it('should remove all the events', () => {
        const tsTest = new Test();
        tsTest.on('test-key-01', () => {
        });
        tsTest.on('test-key-02', () => {
        });
        tsTest.on('test-key-03', () => {
        });

        expect(tsTest.count).to.equal(3);
        tsTest.offAll();
        expect(tsTest.count).to.equal(0);
    });
});

describe('When binding the same callback multiple times to the on function', () => {

    it('should only be bound once to an event', () => {
        const key = 'test-key';
        const callback = sinon.spy();
        const tsTest = new Test();

        let functionCount = tsTest.on(key, callback);
        expect(functionCount).to.equal(1);
        functionCount = tsTest.on(key, callback);
        expect(functionCount).to.equal(1);
        tsTest.emit(key);
        expect(callback.callCount).to.equal(1);

    });
});

describe('When associating different functions to a single', () => {

    it('should return the correct function count', () => {
        const key = 'test-key';
        const callback1 = sinon.spy();
        const callback2 = sinon.spy();
        const tsTest = new Test();

        let functionCount = tsTest.on(key, callback1);
        expect(functionCount).to.equal(1);
        functionCount = tsTest.on(key, callback2);
        expect(functionCount).to.equal(2);
        tsTest.emit(key);
        expect(callback1.callCount).to.equal(1);
        expect(callback2.callCount).to.equal(1);

    });
});

describe('When the same function is bound to 2 events', () => {

    it('should only remove one function', () => {
        const key1 = 'test-key-1';
        const key2 = 'test-key-2';
        const callback = sinon.spy();
        const tsTest = new Test();

        let functionCount = tsTest.on(key1, callback);
        expect(functionCount).to.equal(1);

        functionCount = tsTest.on(key2, callback);
        expect(functionCount).to.equal(1);

        expect(tsTest.count).to.equal(2);
        tsTest.off(key1, callback);


        expect(tsTest.functionCount(key1)).to.equal(0);

        expect(tsTest.functionCount(key2)).to.equal(1);
    });

    it('should fire an event for each key', () => {
        const key1 = 'test-key-1';
        const key2 = 'test-key-2';
        const callback = sinon.spy();
        const tsTest = new Test();
        tsTest.on(key1, callback);
        tsTest.on(key2, callback);
        tsTest.emit(key1);
        tsTest.emit(key2);

        expect(callback.callCount).to.equal(2);
    });
});
