import Message from './message.vue'
export default {
    install(Vue){
        //利用Message作为模板创建一个构造器
        //extend创建的是一个组件构造器(即构造函数)，而不是一个具体的组件实例
        const constructor = Vue.extend(Message);
        let modal = null;//modal是实例
        function info(options = {}) {
            modal = new constructor();//modal才是组件实例
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