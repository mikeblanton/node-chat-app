const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString', () => {
  it('should reject a non-string value', () => {
    var str = 123;
    expect(isRealString(str)).toBeFalsy();
  });
  it('should reject a string with only spaces', () => {
    var str = '         ';
    expect(isRealString(str)).toBeFalsy();
  });
  it('should allow strings with non-space characters', () => {
    var str = 'Valid Value';
    expect(isRealString(str)).toBeTruthy();
  });
});
