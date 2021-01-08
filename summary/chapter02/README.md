# 02 Vue.js 2 - 기대한 방식으로 동작한다

<details><summary>Table of Contents</summary>

-   기본 개념 [🔗](#기본-개념)
    -   Vue 인스턴스 [🔗](#함수와-메소드)
    -   컴포넌트 [🔗](#컴포넌트)
    -   Vue 인스턴스 라이프 사이클 [🔗](#vue-인스턴스-라이프-사이클)
    -   지시자 [🔗](#지시자)
    -   필터 [🔗](#필터)
    -   믹스인 [🔗](#믹스인)
    -   플러그인 [🔗](#플러그인)
-   뒷받침하는 기술 [🔗](#뒷받침하는-기술)
    -   반응형 시스템 [🔗](#반응형-시스템)

</details>

## 기본 개념

### Vue 인스턴스

Vue 애플리케이션은 **루트 Vue 인스턴스**와 **컴포넌트 인스턴스**로 구성된다.

**# data 프로퍼티**  

객체 리터럴을 사용하는 방식과 객체를 반환하는 함수를 사용하는 방식으로 구분  
루트 Vue 인스턴스는 객체 리터럴을 반환하는 방식을 사용해도 된다  
컴포넌트에 대한 데이터 구조에서는 객체를 반환하는 함수를 사용하는 방식으로 한다. 객체 리터럴을 사용하면 컴포넌트의 인스턴스들이 모두 data에 접근하기 때문에 위험하다.  
Vue 3에서는 객체를 반환하는 함수 사용 방식만 남았다.  

```javascript
// 객체 리터럴 사용
new Vue({
    data: {
        messages: [],
        newMessage: ''
    }
});

// 함수 사용
new Vue({
    data() {
        return {
            messages: [],
            newMessage: ''
        };
    }
});
```

**# methods 프로퍼티**  

메소드를 `methods` 프로퍼티에 정의한다.  
메소드는 화살표 함수를 사용할 수 없다. 화살표 함수를 사용하면 `this`로 Vue 인스턴스를 접근할 수 없기 때문이다.  

```javascript
methods: {
    addMessage(event) {
        if (!this.newMessage) {
            return;
        }
        this.messages.push({
            text: this.newMessage,
            createdAt: new Date()
        });

        this.newMessage = '';
    }
}
```

**# computed 프로퍼티**  

로직을 변수처럼 사용하기 위해서 computed 프로퍼티를 추가한다.  
일반적으로 `v-bind`와 같이 사용해서 클래스 속성이나 스타일을 결정한다.

```javascript
computed: {
    addDisabled() {
        return this.messages.length >= 10 || this.newMessage.length > 50
    }
}
```

### 컴포넌트

컴포넌트는 Vue 애플리케이션 코드를 재사용하는 기본적인 방법이다.  
컴포넌트 자체는 Vue 인스턴스이다.  
전역으로 사용하는 컴포넌트와 로컬에서 사용하는 컴포넌트로 구분할 수 있다.  

여러 컴포넌트로 분리해서 관리하는 것이 유지 보수에 용이하다.

**index.html**
```javascript
<script type="module">
    import MessageList from './components/MessageList.js';

    let vm = new Vue({
        el: '#app',
        data: {
            messages: [],
            newMessage: ''
        },
        components: {
            messagelist: MessageList,
        },
        methods: {
            addMessage(event) {
                if (!this.newMessage) {
                    return;
                }
                let now = new Date();
                this.messages.push({
                    id: now.getTime(),
                    text: this.newMessage,
                    createdAt: new Date()
                });

                this.newMessage = '';
            },
            deleteMessage(message) {
                this.messages.splice(this.messages.indexOf(message), 1);
            }
        },
        computed: {
            addDisabled() {
                return this.messages.length >= 10 || this.newMessage.length > 50
            }
        }
    });
</script>
```

**components/MessageList.js**
```javascript
import MessageListItem from './MessageListItem.js';

export default {
    name: 'MessageList',
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
```

**components/MessageListItem.js**
```javascript
export default {
    name: 'MessageListItem',
    template: `
    <li>
        {{ item.text }} - {{ item.createdAt }}
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
```

### Vue 인스턴스 라이프 사이클

<div align="center">
    <img src="./images/vue-lifecycle.png" width="80%"/>
</div>

### 지시자

지시자(directives)는 Vue 애플리케이션에서 값이 변경될 때마다 DOM에 변경 사항을 적용하는 중요한 기능을 담당한다.

사용자 정의 지시자(directive)를 `Vue.directive()` 메서드로 만들 수 있다.

**index.html**
```html
<textarea v-focus></textarea>
<script type="module">
    import './directives/focus.directive.js'
</script>
```

**directives/focurs.directive.js**
```javascript
Vue.directive('focus', {
    inserted: function(el) {
        el.focus();
    }
});
```

### 필터

Vue 애플리케이션 필터를 이용해서 이중 중괄호 보간법 또는 v-bind 표현법을 이용할 떄 테스트 형식을 지정한다.  
`Vue.filter` 메소드로 필터를 정의해서 사용할 수 있다.

**index.html**
```html
<script type="module">
    import './filters/datetime.filter.js'
</script>
```

**component/MessageListItem.js**
```javascript
export default {
    template: `
    <li>
        {{ item.text }} - {{ item.createdAt | datetime }}
        <button @click="deleteClicked">X</button>
    </li>`,
}
```

**filters/datetime.filter.js**
```javascript
const formatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric', month: 'long', week: 'long', day: 'numeric',
    hour: 'numeric', minute: 'numeric', second: 'numeric'
});

Vue.filter('datetime', function(value) {
    if (!value) {
        return ''
    };
    return formatter.format(value);
});
```

### 믹스인

믹스인은 코드를 재사용하기 위한 방법이다.  
믹스인이 전역으로 등록되면 별도의 선언이 필요없이 모든 Vue 인스턴스에 믹스인이 적용된다.

**mixins/lifecycle-logger.mixin.js**
```javascript
export default {
    created() {
        console.log(`${this.$options.name} created`);
    },
    beforeMount() {
        console.log(`${this.$options.name} about to mount`);
    },
    mounted() {
        console.log(`${this.$options.name} mounted`);
    },
    destroyed() {
        console.log(`${this.$options.name} destroyed`);
    }
};
```

**index.html**
```html
<script type="module">
    import lifecycleLogger from './mixins/lifecycle-logger.mixin.js'

    let vm = new Vue({
        name: 'Root Vue Instance',
        el: '#app',
        mixins: [lifecycleLogger],
    });
</script>
```

### 플러그인

플러그인은 Vue 프레임워크를 확장하기 위한 방법으로 Vuex와 Vue Router가 대표적이다.  
플러그인 개발을 위해서는 `install()` 메소드를 가진 일반 객체를 만든다.  
생성한 일반 객체는 Vue의 믹스인으로 전역 등록하는 방식으로 활용한다.  

**plugins/lifecycle-logger.plugin.js**
```javascript
const switchers = {
    created: true,
    beforeMount: true,
    mounted: true,
    destroyed: true
};

export default {
    install (Vue, options) {
        Object.assign(switchers, options);
        Vue.mixin({
            created() {
                if (switchers.created) {
                    console.log(`${this.$options.name} created`);
                }
            },
            beforeMount() {
                if (switchers.beforeMount) {
                    console.log(`${this.$options.name} about to mount`);
                }
            },
            mounted() {
                if (switchers.mounted) {
                    console.log(`${this.$options.name} mounted`);
                }
            },
            destroyed() {
                if (switchers.destroyed) {
                    console.log(`${this.$options.name} destroyed`);
                }
            },
        })
    }
};
```

**index.html**
```html
<script type="module">
    import lifecycleLogger from './plugins/lifecycle-logger.plugin.js'
    
    Vue.use(lifecycleLogger, {beforeMount: false});
</script>
```

## 뒷받침하는 기술

### 반응형 시스템

<div align="center">
    <img src="./images/vue-reactivity.png" width="80%"/>
</div>