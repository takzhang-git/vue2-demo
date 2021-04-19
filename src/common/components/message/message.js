import Message from './message.vue'
export default {
    install(Vue){
        //利用Message创建一个构造器
        const constructor = Vue.extend(Message);
        let modal = null;//modal是实例
        function info(options = {}) {
            modal = new constructor();
            Object.assign(modal, options);
            modal.clickLeft = () => {
                options.cancel && options.cancel();
                close();
            }
            modal.clickRight = () => {
                options.ok && options.ok();
                close();
            }
            modal.visible = true;
            document.body.appendChild(modal.$mount().$el);
        }
        function close(){
            modal.visible = false;
            modal.$el.remove();
            modal = null;
        }
        Vue.prototype.$Message = {
            info,
        };
    }
}