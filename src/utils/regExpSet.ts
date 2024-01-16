/*
 * @Date: 2023-12-21 11:04:46
 * @LastEditors: @yujie
 * @LastEditTime: 2023-12-22 10:31:51
 * @Description:
 */

const integerReg = '[1-9]\\d*'

const decimalsReg = '.\\d+'

const decimalsRegOptional = '(.\\d+)?'

const decimalsRegTwo = '.\\d{1,2}'

const decimalsRegTwoOptional = '(.\\d{1,2})?'

// 正整数
const integer = `${integerReg}`
// 负整数
const minus = `-${integerReg}`
// 正负整数
const integerMinus = `-?${integerReg}`

// 正小数不限制位数
const decimals = `(${integerReg}|0)${decimalsReg}`
// 负小数不限制位数
const decimalsMinus = `-${decimals}`
// 正负小数不限制位数
const decimalsPositiveMinus = `-?${decimals}`

// 正小数两位小数
const decimalsTwo = `(${integerReg}|0)${decimalsRegTwo}`
// 负小数两位小数
const decimalsMinusTwo = `-${decimalsTwo}`
// 正负小数两位小数
const decimalsPositiveMinusTwo = `-?${decimalsTwo}`

// 正整数或小数不限制位数
const integerDecimals = `(${integerReg}|0)${decimalsRegOptional}`
// 负整数或小数不限制位数
const integerDecimalsMinus = `-${integerDecimals}`
// 正负整数或小数不限制位数
const integerDecimalsPositiveMinus = `-?${integerDecimals}`

// 正整数或小数两位小数
const integerDecimalsTwo = `(${integerReg}|0)${decimalsRegTwoOptional}`
// 负整数或小数两位小数
const integerDecimalsMinusTwo = `-${integerDecimalsTwo}`
// 正负整数或小数两位小数
const integerDecimalsPositiveMinusTwo = `-?${integerDecimalsTwo}`

interface MyObject {
  [key: string]: string
}
const regExpSet: MyObject = {
  integer,
  minus,
  integerMinus,
  decimals,
  decimalsMinus,
  decimalsPositiveMinus,
  decimalsTwo,
  decimalsMinusTwo,
  decimalsPositiveMinusTwo,
  integerDecimals,
  integerDecimalsMinus,
  integerDecimalsPositiveMinus,
  integerDecimalsTwo,
  integerDecimalsMinusTwo,
  integerDecimalsPositiveMinusTwo
}

function regExpInstance(reg: string) {
  return new RegExp(`^${reg}$`)
}

function validation(regExp: string, value: string): boolean {
  if (Reflect.has(regExpSet, regExp)) {
    const reg = regExpSet[regExp]
    return regExpInstance(reg).test(value)
  } else {
    return false
  }
}

function get(reg: string) {
  return regExpInstance(regExpSet[reg])
}

export default { get, validation }
