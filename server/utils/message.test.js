const expect = require('expect');

const {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    var from = 'From';
    var text = 'Message';
    var resp = generateMessage(from, text);
    console.log(resp);
    expect(resp.from).toBe(from);
    expect(resp.text).toBe(text);
    expect(resp.createdAt).toBeA('number');
  })
});
