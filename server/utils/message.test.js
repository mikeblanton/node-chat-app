const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message');

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

describe('generateLocationMessage', () => {
  it('should generate the correct location message object', () => {
    var from = 'From';
    var lat = 37.6788012;
    var lng = -121.7807947;
    var resp = generateLocationMessage(from, lat, lng);
    console.log(resp);
    expect(resp.from).toBe(from);
    expect(resp.url).toBe(`https://www.google.com/maps?q=${lat},${lng}`);
    expect(resp.createdAt).toBeA('number');
  })
});
