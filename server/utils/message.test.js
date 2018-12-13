var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

// Testsuite for generateMessage function
describe('generateMessage Testsuite', () => {
  it('should generate the correct message object', () => {
    var from = 'Test User';
    var text = 'Test text';

    // Call function under test
    var msg = generateMessage( from, text);

    // Assert reponse values
    expect(msg).toInclude({from, text});
    expect(typeof msg.createdAt).toBe('number');
  });
});

describe('generateLocationMessage Testsuite', () => {
  it('should generate correct location object', () => {
    var from = 'Test User';
    var lat = 123;
    var lng = 345;
    var url = `https://www.google.com/maps?q=${lat},${lng}`;

    // Call function under test
    var msg = generateLocationMessage(from, lat, lng);

    // Assert reponse values
    expect(msg).toInclude({from, url});
    expect(typeof msg.createdAt).toBe('number');
  });
});
