import LifecycleLogger from '../mixins/lifecycle-logger.mixin.js'


export default {
    name: 'MessageListItem',
    mixins: [LifecycleLogger],
    template: `
    <li>
        {{ item.text }} - {{ item.createdAt | datetime }}
        <button @click="deleteClicked">X</button>
    </li>`,
    methods: {
        deleteClicked() {
            this.$emit('delete');
        }
    },
    props: {
        item: {
            type: Object,
            required: true
        }
    }
}