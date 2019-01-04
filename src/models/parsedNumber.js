import BigNumber from "bignumber.js";
import { eps } from "../services/util";

/**
 * @typedef BackSpaceResults
 * @property {boolean} hitTheDecimalPlace indicated if this operation just deleted the last decimal digit like from 1.1 -> 1
 * @property {boolean} didUpdate indicated if this operation just changed anything for example if the number is 0 it will do nothing
 * @property {ParsedNumber} [result] only used in backSpaceNoMutate and it will have the cloned parsedNumber if the operation changed something
 */

/**
 * @typedef InsertDigitResults
 * @property {boolean} didUpdate indicated if this operation just changed anything for example if the number is 0 and you click zero or the digits are full no change will occure
 * @property {ParsedNumber} [result] only used in insertDigitNoMutate and it will have the cloned parsedNumber if the operation changed something
 */

/**
 * @property {string} digits
 */
export default class ParsedNumber {
  /**
   * @public
   * @type {Array.<string|number>}
   * @description an array of the digits to be displayed
   * @example ['','',1]
   */
  digits;
  /**
   * @public
   * @type {number}
   * @description the number of decimal places, e.g. it will be 2 in 0.22
   */
  decimalPlaces;
  /**
   * @public
   * @type {number}
   * @description the number of whole numbers (before the decimal dot)
   */
  wholeNumberCount;
  /**
   * @public
   * @type {number}
   * @description the number of emply digits at the start of digits, these will not display on the calculator
   */
  emptyCount;
  /**
   * @public
   * @type {number}
   * @description the sign of the number 1 for positive number and -1 for negative ones
   */
  sign;
  /**
   * @public
   * @type {boolean}
   * @description is the number greater than what can be displayed on the screen?
   */
  overflow;
  /**
   * @public
   * @type {boolean}
   * @description is the number invalid e.g. 1/0 0/0 sqrt(-1)
   */
  invalid;

  /**
   * @param {BigNumber|number} bigNumber 
   * @param {number} maxDigits the max number of digits to use to represent this number i.e. decimals will be trunkated and if number overflows it will indicate it
   */
  constructor(bigNumber, maxDigits) {
    if(typeof(bigNumber) === 'number') {
      bigNumber = BigNumber(bigNumber);
    }
    if(bigNumber.isNaN()) {
      const digits = Array(maxDigits - 3).fill('');
      digits.push('N','A','N');
      Object.assign(this, {
        digits: digits,
        decimalPlaces: 0,
        wholeNumberCount: 3,
        emptyCount: maxDigits - 3,
        sign: 1,
        overflow: false,
        invalid: true,
      });
    }
    else if(!bigNumber.isFinite()) {
      const digits = Array(maxDigits - 3).fill('');
      digits.push('I','N','F');
      Object.assign(this, {
        digits: digits,
        decimalPlaces: 0,
        wholeNumberCount: 3,
        emptyCount: maxDigits - 3,
        sign: bigNumber.s,
        overflow: false,
        invalid: true,
      });
    }
    else {

      let num = bigNumber.toNumber();
    
      const sign = (num + eps) >= 0 ? 1 : -1;
      let push0 = false; // for the zero in numbers < 1 like 0.1
      num = Math.abs(num);
    
      let decimalPlaces = 0;
      let wholeNumberCount = 0;
    
      let numTmp = num;
      for(;numTmp + eps >= 1; wholeNumberCount++) {
        numTmp /= 10;
      }
      if(wholeNumberCount === 0) {
        push0 = true;
        wholeNumberCount = 1;
      }
      for(; Math.abs(num - Math.round(num)) > eps &&  decimalPlaces < maxDigits - wholeNumberCount; decimalPlaces++) {
        num *= 10;
      }
      if(decimalPlaces === 0) {
        push0 = false;  // the number is zero
      }
      num = Math.round(num);
      const numStr = num.toString();
      
      const overflow = wholeNumberCount > maxDigits;
      
      const digits = Array.prototype.map.call(numStr, function(char) {
        return char.charCodeAt(0) - 48;
      });
      if(overflow) {
        digits.splice(maxDigits, digits.length - maxDigits);
        digits[maxDigits - 1] = 'E';
      }
      if(push0) { // maybe more that just one zero cause say 0.00001 in digits is just one so i need to push the extra zeros
        if(decimalPlaces - digits.length + 1 > 0) {
          if(Array.prototype.fill) {
            Array.prototype.unshift.apply(digits, Array(decimalPlaces - digits.length + 1).fill(0));
          }
          else {
            Array.prototype.unshift.apply(digits, Array.apply(null, { length: decimalPlaces - digits.length + 1 }).map(() => 0));
          }
        }
      }
      let emptyCount = maxDigits - digits.length;
      for(let i = digits.length; i < maxDigits; i++) {
        digits.unshift('');
      }
      Object.assign(this, {
        digits: digits,
        decimalPlaces: decimalPlaces,
        wholeNumberCount: wholeNumberCount,
        emptyCount: emptyCount,
        sign: sign,
        overflow: overflow,
        invalid: false,
      });
    }
  }

  /**
   * @returns {BigNumber}  the BigNumber representation of the parsed number
   * @description returns big number representation of this number
   */
  toBigNumber() {
    var num = 0;
    for(var i = this.emptyCount; i < this.digits.length; i++) {
      num = num * 10 + this.digits[i];
    }
    return BigNumber(num).dividedBy(Math.pow(10, this.decimalPlaces) * this.sign);
  }

  /**
   * @returns {ParsedNumber}
   * @description returns a clone of this number
   */
  clone() {
    var ret = new ParsedNumber(0, this.digits.length);
    ret.decimalPlaces = this.decimalPlaces;
    ret.digits = this.digits.slice();
    ret.emptyCount = this.emptyCount;
    ret.invalid = this.invalid;
    ret.overflow = this.overflow;
    ret.sign = this.sign;
    ret.wholeNumberCount = this.wholeNumberCount;
    return ret;
  }

  /**
   * @description flips the sign of the number NOTE this function MUTATES the object to avoid mutating either clone first or use flipSignNoMutate
   * @returns {ParsedNumber} self
   */
  flipSign() {
    this.sign = -this.sign;
    return this;
  }

  /**
   * @description flips the sign of the number
   * @returns {ParsedNumber} clone with sign flipped
   */
  flipSignNoMutate() {
    return this.clone().flipSign();
  }

  /**
   * @returns {BackSpaceResults}
   * @description removes last digit of the number NOTE: this mutates the parcedNumber to avoid this clone first or use backSpaceNoMutate
   */
  backSpace() {
    let hitTheDecimalPlace = false, didUpdate = true;
    if(this.emptyCount === this.digits.length - 1) {
      if(this.digits[this.digits.length - 1] !== 0) {
        this.digits[this.digits.length - 1] = 0;
      }
      else {
        didUpdate = false;
      }
    }
    else {
      this.digits.splice(this.digits.length - 1, 1);
      this.digits.unshift('');
      this.emptyCount++;
      if(this.decimalPlaces > 0) {
        this.decimalPlaces--;
        hitTheDecimalPlace = this.decimalPlaces === 0;
      }
      else {
        this.wholeNumberCount--;
      }
    }
    return {
      hitTheDecimalPlace,
      didUpdate
    };
  }

  /**
   * @returns {BackSpaceResults|null} if the operation doesnt do an update (in the case of 0) it will return null
   */
  backSpaceNoMutate() {
    const clone = this.clone();
    const backSpaceResults = clone.backSpace();
    if(backSpaceResults.didUpdate) {
      backSpaceResults.result = clone;
      return backSpaceResults;
    }
    return null;
  }

  /**
   * @returns {InsertDigitResults}
   * @description adds key as a last digit of the number NOTE: this mutates the parcedNumber to avoid this clone first or use insertDigitNoMutate
   */
  insertDigit(key, dotActive) {
    let didUpdate = true;
    if(this.emptyCount > 0) {
      if(!dotActive && this.emptyCount === this.digits.length - 1 && this.digits[this.digits.length - 1] === 0) {
        if(key !== 0) {
          this.digits[this.digits.length - 1] = key;
        }
        else {
          didUpdate = false;  // the number is 0 and you click zero
        }
      }
      else {
        if(this.decimalPlaces > 0 || dotActive) {
          this.decimalPlaces++
        }
        else {
          this.wholeNumberCount++
        }
        this.digits.shift();
        this.emptyCount--;
        this.digits.push(key);
      }
    }
    else {
      didUpdate = false;
    }
    return {
      didUpdate
    };
  }

  /**
   * @returns {InsertDigitResults|null} if the operation doesnt do an update (in the case of 0 an press zero for example) it will return null
   */
  insertDigitNoMutate(key, dotActive) {
    const clone = this.clone();
    const insertDigitResults = clone.insertDigit(key, dotActive);
    if(insertDigitResults.didUpdate) {
      insertDigitResults.result = clone;
      return insertDigitResults;
    }
    return null;
  }

  /**
   * @returns {ParsedNumber} this operation is mutation safe, it returns a clone with the square root of the current number
   */
  sqrt() {
    return new ParsedNumber(this.toBigNumber().sqrt(), this.digits.length);
  }

}
