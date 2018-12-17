const expect = require('expect');
const {isRealString} = require('./validation');

//Testsuite for isRealString function
describe('isRealString Function Testsuite', () => {
  it('should reject non-string values', () => {
    var nonStrVal = 123;
    var res = isRealString(nonStrVal);
    expect(res).toBeFalsy();
  });

  it('should reject string with only spaces', () => {
    var empyStr = '   ';
    var res = isRealString(empyStr);
    expect(res).toBeFalsy();
  });

  it('should allow string with non-space characters', () => {
    var validStr = "MyChatRoom";
    var res = isRealString(validStr);
    expect(res).toBeTruthy();
  });

  it('should allow string with non-space characters', () => {
    var validStr = "My Chat Room";
    var res = isRealString(validStr);
    expect(res).toBeTruthy();
  });

  it('should allow string with non-space characters', () => {
    var validStr = " My Chat Room  ";
    var res = isRealString(validStr);
    expect(res).toBeTruthy();
  });


});
