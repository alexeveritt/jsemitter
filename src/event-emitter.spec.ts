import {EventEmitter} from './event-emitter';
import {expect} from 'chai';
import 'mocha';

class Test extends EventEmitter {

}

describe('Hello function', () => {


    it('should return hello world', (done) => {
        const tsTest = new Test();
        tsTest.on('test-key', result => {

            expect(result).to.equal('Hello World!');
            return done();
        });
        tsTest.emit('test-key', 'Hello World!')

    });

});
