import Vue from 'vue';
import Component from 'vue-class-component';
import moment from 'moment';

@Component
export default class MyMixin extends Vue {
    mixinValue = `hello i am from mixin${moment().format('YYYY年MM月DD日')}`
}