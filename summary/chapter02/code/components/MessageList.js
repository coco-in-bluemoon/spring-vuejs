import MessageListItem from './MessageListItem.js';
import LifecycleLogger from '../mixins/lifecycle-logger.mixin.js'

export default {
    name: 'MessageList',
    mixins: [LifecycleLogger],
    template: `<ul>
        <!--
        <li v-for="item in items" :item="item">
            {{ item.text }} - {{ item.createdAt }}
            <button @click="deleteMessage(item)">X</button>
        </li>
        -->
        <messagelistitem v-for="item in items" :key="item.id" :item="item" @delete="deleteMessage(item)"></messagelistitem>
    </ul>`,
    props: {
        items: {
            type: Array,
            required: true
        }
    },
    methods: {
        deleteMessage(message) {
            this.$emit('delete', message)
        }
    },
    components: {
        messagelistitem: MessageListItem
    }
};