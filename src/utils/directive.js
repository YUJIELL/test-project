

/*
 * @Date: 2023-11-13 15:43:12
 * @LastEditors: @yujie
 * @LastEditTime: 2023-12-20 16:28:57
 * @Description: 
 */
import { isNotNull } from './index';
import enums from '@/enums/index';

export class Store {
    constructor() {
        this.state = {}
    }
    set(key, val) {
        this.state[key] = val
    }
    get(key) {
        return this.state[key]
    }
}
// 整数包含负数
const allowMinusReg = '(-[1-9]*|\\d+)'
// 正整数
const integerReg = '\\d+'



/**
 * 保留两位小数
 * @param {*} el
 * @param {*} binding
 * @param {*} binding.value 整数/小数位数 格式：整数位数 Integer+数字、小数位数 Decimal+数字，例：Integer3、Decimal2、Integer3Decimal2
 * @param {*} binding.arg 传给指令的参数(冒号后的v-focus:foo参数是 "foo")
 * @param {*} binding.modifiers：修饰符对象(v-focus.foo修饰符对象是 { foo: true })
 */
export function decimals(el, binding, store, key) {
    if (el.tagName.toLocaleUpperCase() !== 'INPUT') {
        el = el.getElementsByTagName('input')[0]
    }

    const inputValue = el.value
    let decimalNum = 2 // 小数位数默认2
    let integerNum = '' // 整数位数默认不限制
    let allowMinus = false // 允许负数
    const { value = null, arg, modifiers } = binding
    const { integer = false, minus = false } = modifiers // 仅允许整数
    allowMinus = minus // 是否允许负数

    const valueRegExp = /^(Integer\d|Decimal\d)+$/
    if (value && valueRegExp.test(value)) {
        // const [one, two] = value.match(/(Integer\d)|(Decimal\d)/g)
        if (value.includes('Integer')) {
            integerNum = /Integer(\d)/g.exec(value)[1]
        }
        if (value.includes('Decimal')) {
            decimalNum = /Decimal(\d)/g.exec(value)[1]
        }
    }
    // 是否负数
    const isMinusReg = allowMinus ? allowMinusReg : integerReg
    // 整数
    const regExpInteger = new RegExp(`^${isMinusReg}$`, 'g')
    // 小数
    const regExpDecimal = new RegExp(`^${isMinusReg}(?:\\.\\d+)?$`, 'g')
    // 小数输入中
    const regExpDecimalInputting = new RegExp(`^${isMinusReg}(?:\\.\\d{0,2})?$`, 'g')
    const regExpDecimalTwo = new RegExp(`^\\d{1,${integerNum}}(?:\\.\\d{1,${decimalNum}})?$`, 'g')
    const regExpDecimalTwoInputting = new RegExp(`^\\d{1,${integerNum}}(?:\\.\\d{0,${decimalNum}})?$`, 'g')

    if (isNotNull(inputValue)) {
        let type = null
        if (integer) {
            type = regExpInteger.test(inputValue)
        } else {
            if (value) {
                type = regExpDecimalTwoInputting.test(inputValue)
            } else {
                type = regExpDecimalInputting.test(inputValue)
            }
        }
        if (type) {
            store.set(key, inputValue)
            el.value = inputValue
        } else {
            const decimals = store.get(key)
            el.value = decimals
        }
        // 手动触发input事件,使绑定的变量更新。EventTarget.dispatchEvent()方法会向一个指定的事件目标派发一个Event,并以合适的顺序(同步地)调用所有受影响的EventListener。
        el.dispatchEvent(new Event('input'))
    } else {
        store.set(key, inputValue)
    }
}

// 输入框千分位
export function thousands(el) {
    if (el.tagName.toLocaleUpperCase() !== 'INPUT') {
        el = el.getElementsByTagName('input')[0]
    }
    // 初始化千分位
    toThousands(el)
    // 聚焦时转为数字
    el.onfocus = () => {
        el.value = parseFloat(el.value.replace(/,/g, ''))
    }
    // 聚焦时转千分位
    el.onblur = () => {
        toThousands(el)
    }
}

function toThousands(el) {
    const numberValue = parseFloat(el.value.replace(/,/g, ''))
    if (!isNaN(numberValue)) {
        el.value = numberValue.toLocaleString('zh', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })
    }
}


let debounceFunc = null
/**
 * 防抖指令
 * @param {*} el 
 * @param {*} binding 
 * @param {*} binding.value 回调函数
 * @param {*} binding.arg 传给指令的参数，设置延迟毫秒
 */
export function vDebounce(el, binding) {
    const { value = null, arg: delay = 300, modifiers, instance } = binding
    const { immediate = false } = modifiers // immediate：是否立即执行
    if (value && typeof value === 'function') {
        if (typeof debounceFunc !== 'function') {
            debounceFunc = debounce(value, delay, immediate)
        } else {
            debounceFunc()
        }
    }
}

/**
 * @desc 函数防抖
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param immediate true 表立即执行，false 表非立即执行
 */
export function debounce(func, delay = 300, immediate = false) {
    let timer;
    return function () {
        let context = this;
        if (timer) clearTimeout(timer);
        if (immediate) {
            let callNow = !timer;
            timer = setTimeout(() => {
                timer = null;
            }, delay)
            if (callNow) func.apply(context, arguments);
        } else {
            timer = setTimeout(() => {
                func.apply(context, arguments);
            }, delay)
        }
    }
}

/**
 * 获取枚举值
 * @param {*} el 
 * @param {*} binding 
 */
export function EnumInstance(el, binding) {
    const { value = null } = binding
    const text = el.innerText
    if (value) {
        const enumValue = enums.getValueByKey(value, text)
        if (enumValue) {
            el.innerText = enumValue
        }
    }
}