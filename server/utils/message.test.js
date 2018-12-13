var expect = require('expect');
var {generateMessage} = require('./message');

// Testsuite for generateMessage function
describe('', () => {
  it('should generate the correct message object', () => {
    var from = 'Test User';
    var text = 'Test text';
    var msg = generateMessage( from, text);

    expect(msg).toInclude({from, text});
    expect(typeof msg.createdAt).toBe('number');
  });
});
