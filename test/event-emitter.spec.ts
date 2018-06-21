import {EventEmitter} from '../src/event-emitter';
import {expect} from 'chai';
import 'mocha';

class Test extends EventEmitter {

}

describe('on function', () => {


    it('should return hello world', (done) => {
        const tsTest = new Test();
        tsTest.on('test-key', result => {

            expect(result).to.equal('Hello World!');
            return done();
        });
        tsTest.emit('test-key', 'Hello World!')

    });


});


describe('on direct function', () => {

    //

    it('should return hello world', (done) => {
        const tsTest = new EventEmitter();
        tsTest.on('test-key', result => {

            expect(result).to.equal('Hello World!');
            return done();
        });
        tsTest.emit('test-key', 'Hello World!')

    });


});

describe('off function', () => {

    //


    it('should remove the event', () => {
        // const tsTest = new EventEmitter();
        const tsTest = new Test();
        tsTest.on('test-key', () => {
        });
        expect(tsTest.count).to.equal(1);
        tsTest.off('test-key');
        expect(tsTest.count).to.equal(0);
    });


});
