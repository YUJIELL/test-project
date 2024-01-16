import ConstantEnum from './constantEnum';

class Enum {
    constructor() {
        this.enumInfo = {}
        this.init()
    }
    init() {
        const enums = { ...ConstantEnum }
        for (const [key, data] of Object.entries(enums)) {
            this.setEnum(key, data)
        }
    }
    /**
     * 添加枚举
     * @param {String | Number} key 枚举的key
     * @param {Array | Object} data 枚举的数据
     * @param {Object} option 配置项
     * @param {String} option.key 指定枚举值的key为某个字段
     * @param {String} option.value 指定枚举值的value为某个字段
     */
    setEnum(key, data, option = {
        key: 'key',
        value: 'value'
    }) {
        if (Array.isArray(data)) {
            const info = data.map(item => {
                const infoKey = option.key
                const infoValue = option.value
                return {
                    key: item[infoKey],
                    value: item[infoValue],
                }
            })
            this.enumInfo[key] = info
        } else {
            const info = []
            for (const [infoKey, infoValue] of Object.entries(data)) {
                info.push({
                    key: infoKey,
                    value: infoValue,
                })
            }
            this.enumInfo[key] = info
        }
    }
    /**
     * 批量添加枚举
     * @param {Object} data 
     */
    setEnumObj(data) {
        this.enumInfo = data
    }
    /**
     * 获取枚举列表
     * @param {String|Number} key
     * @returns [{key: '', value: ''}]
     */
    get(key = null) {
        if (key && this.has(key)) {
            return this.enumInfo[key]
        } else {
            return this.enumInfo
        }
    }
    /**
     * 获取枚举列表的key集合
     * @param {String|Number} key
     * @returns [key1, key2]
     */
    getKeys(key) {
        if (this.has(key)) {
            return this.enumInfo[key].map(item => {
                return item.key
            })
        } else {
            return undefined
        }

    }
    /**
     * 获取枚举列表的value集合
     * @param {String|Number} key
     * @returns [value1, value2]
     */
    getValues(key) {
        if (this.has(key)) {
            return this.enumInfo[key].map(item => {
                return item.value
            })
        } else {
            return undefined
        }

    }
    /**
     * 在枚举列表中根据key匹配对应value
     * @param {String|Number} enumKey 枚举列表的key
     * @param {String|Number} infoKey 具体枚举值的key
     * @returns value
     */
    getValueByKey(enumKey, infoKey) {
        if (this.has(enumKey)) {
            const info = this.enumInfo[enumKey].find(item => item.key === infoKey)
            return info.value
        } else {
            return undefined
        }
    }
    /**
     * 获取element-select类型的列表
     * @param {String|Number} key
     * @returns [{label: '', value: ''}]
     */
    getOptions(key) {
        if (this.has(key)) {
            return this.enumInfo[key].map(item => {
                return {
                    label: item.key,
                    value: item.value
                }
            })
        } else {
            return undefined
        }

    }
    // 判断枚举key是否存在
    has(key) {
        const type = Reflect.has(this.enumInfo, key)
        if (!type) {
            console.error(`枚举 '${key}' 不存在`)
        }
        return type
    }
}
const enumInstance = new Enum()
export default enumInstance