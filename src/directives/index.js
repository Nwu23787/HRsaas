// 自定义指令
export const imageError = {
    inserted(dom, options) {
        dom.onerror = () => {
            dom.src = options.value
        }
    }
}