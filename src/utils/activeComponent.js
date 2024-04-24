class ActiveComponent {
    constructor() {
        this.components = []
        this.activeId = null
    }
    setComponent(component) {
        this.components.push(component)
    }
    setComponentActive(id) {
        if (this.activeId) {
            // 关闭前一个活跃组件
            const component = this.components.find(item=>this.activeId === item.id)
            component.func()
        }
        // 设置活跃id
        this.activeId = id
    }
}
const activeComponent = new ActiveComponent()
export default activeComponent