/*
 * @Date: 2023-12-07 14:16:38
 * @LastEditors: @yujie
 * @LastEditTime: 2024-01-02 16:03:18
 * @Description: 
 */

interface specInfo{
    title: string
    list: string[]
}

interface specCombination {
    id: string,
    specs: string[]
}

class Adjoin {
    specification: specInfo[]
    vertex: string[]
    quantity: number
    adjoinArray: any[]
    constructor(specification: specInfo[]) {
        this.specification = specification
        const vertex = specification.reduce((total: any[], num: specInfo) => {
            return [...total, ...num.list]
        }, [])
        this.vertex = vertex // 所有顶点
        this.quantity = vertex.length // 顶点数
        this.adjoinArray = []
        this.init()
    }
    init() {
        this.adjoinArray = new Array(this.quantity * this.quantity).fill(null)
    }
    // 数组求交集
    arrayIntersect<T>(arrayA: T[], arrayB: T[]): T[] {
        let newArray: T[] = []
        let lenA = arrayA.length
        let lenB = arrayB.length
        if (lenA < lenB) {
            arrayA.forEach(element => {
                if (arrayB.includes(element)) {
                    newArray.push(element)
                }
            });
        } else {
            arrayB.forEach(element => {
                if (arrayA.includes(element)) {
                    newArray.push(element)
                }
            });
        }
        return newArray;
    }
    // 数组并集
    arrayUnion<T>(arrayA: T[], arrayB: T[]): T[] {
        let newArray = [...arrayA, ...arrayB]
        return Array.from(new Set(newArray))
    }
    // 根据单条库存设置顶点关联
    setVertexRelevance(list: string[]) {
        for (let rowIndex = 0; rowIndex < this.vertex.length; rowIndex++) {
            const row: string = this.vertex[rowIndex];
            const specification = this.specification.find((item: specInfo)=>{return item.list.includes(row)})
            const category: string[] = (specification as specInfo).list
            if (list.includes(row)) {
                for (let colIndex = 0; colIndex < this.vertex.length; colIndex++) {
                    const col: string = this.vertex[colIndex];
                    if (col !== row) {
                        // category：同级可选
                        if (list.includes(col) || category.includes(col)) {
                            const index = rowIndex * this.quantity + colIndex
                            this.adjoinArray[index] = col
                        }
                    }
                }
                // console.log('this.adjoinArray', this.adjoinArray);
            } else {
                continue
            }
        }
    }
    // 根据所有库存信息设置顶点关联
    setAllVertexRelevance(list: specCombination[]) {
        list.forEach((item: specCombination) => {
            // 注册邻接点
            this.setVertexRelevance(item.specs)
        })
    }
    // 根据节点列表获取可用的节点
    getAvailableAllByVertex(list: string[] = []): string[] {
        if (list.length) {
            let newList: string[] = []
            list.forEach((item) => {
                const inventory = this.getAvailableByVertex(item)
                if (newList.length) {
                    newList = this.arrayIntersect(newList, inventory)
                } else {
                    newList = inventory
                }
            })
            return newList
        } else {
            return this.getAvailableAll()
        }

    }
    // 根据单个节点获取可用的节点
    getAvailableByVertex(vertex: string): string[] {
        const startIndex = this.vertex.findIndex(item => item === vertex) * this.quantity
        const endIndex = startIndex + this.quantity
        const inventory = this.adjoinArray.slice(startIndex, endIndex)
        return [vertex, ...inventory.filter(item => item)]
    }
    // 获取矩阵节点
    getAdjoinArray() {
        return this.adjoinArray
    }
    // 获取所有库存的节点
    getAvailableAll() {
        return Array.from(new Set(this.adjoinArray)).filter(item=>item)
    }


}
export default Adjoin