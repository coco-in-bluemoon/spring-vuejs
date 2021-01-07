# 01 모던 웹 애플리케이션 개발 - 이것은 신기원이다

<details><summary>Table of Contents</summary>

-   소개 [🔗](#소개)
-   자바 개발자의 관점에서 본 자바스크립트 [🔗](#자바-개발자의-관점에서-본-자바스크립트)
    -   함수와 메소드 [🔗](#함수와-메소드)
    -   객체와 클래스 [🔗](#객체와-클래스)
    -   객체, 프로퍼티, 프로퍼티 속성 [🔗](#객체-프로퍼티-프로퍼티-속성)
    -   프로토타입과 상속 [🔗](#프로토타입과-상속)
    -   스코프와 클로저 [🔗](#스코프와-클로저)
    -   this 키워드 [🔗](#this-키워드)
    -   호이스팅 [🔗](#호이스팅)
-   ES6 기본 [🔗](#es6-기본)
    -   블록 스코프, let, const [🔗](#블록-스코프-let-const)
    -   클래스 [🔗](#클래스)
    -   강화된 객체 리터럴 [🔗](#강화된-객체-리터럴)
    -   화살표 함수 [🔗](#화살표-함수)
    -   매개변수 기본값 [🔗](#매개변수-기본값)
    -   나머지 매개변수 [🔗](#나머지-매개변수)
    -   전개 구문 [🔗](#전개-구문)
    -   비구조화 할당 [🔗](#비구조화-할당)
    -   템플릿 리터럴 [🔗](#템플릿-리터럴)
    -   모듈 [🔗](#모듈)
    -   프로미스 [🔗](#프로미스)

</details>

## 소개

트렐로(Trello)와 같은 작업 관리 애플리케이션 TaskAgile 모던 웹 애플리케이션을 만든다.

**프론트엔드**: Vue.js 프레임워크   
**백엔드**: Spring 5 프레임워크

## 자바 개발자의 관점에서 본 자바스크립트
### 함수와 메소드

**# 함수와 메서드의 차이**  

자바스크립트에서 함수(function)은 Function 생성자로 생성된 객체이다.  
자바스크립트에서 메소드(method)는 함수(function)이 객체의 프로퍼티(property)일 때를 의미한다.

`instance` 명령어로 객체가 함수인지 아닌지 판별할 수 있다.
```javascript
var workout = function() { };
console.log(workout instance unction); // true 출력
```

**# 함수와 객체의 차이**  

자바스크립트에서 함수(function)은 Function 객체이다.  
자바스크립트에서 함수(function)은 호출할 수 있지만 객체는 호출할 수 없다.  
자바스크립트에서 함수(function)은 프로토타입(prototype)을 가지지만 객체는 가지지 않는다.  

**# 객체 생성하기**  

자바스크립트에서 객체를 생성할 때 함수(function)와 `new` 키워드를 활용한다.  
이러한 함수는 생성자 역할을 하는 함수라고 하며, 대문자로 시작한다.  
```javascript
function User() { }
var user = new User();
```

**# 함수 생성하기**  

함수를 생성하는 방법은 <u>함수 선언 방법</u>과 <u>함수 표현식 방법</u>으로 구분한다.  
1. 함수 선언(function declaration)

```javascript
function User() { }
```

2. 함수 표현식(function experssion)

```javascript
var workout = function() { };
```

### 객체와 클래스

개념을 표현하기 위해서 클래스를 생성한다.  
객체는 클래스의 인스턴스이다.  

**# 객체 생성하는 방법**

1. Object 생성자

Object 생성자를 통해 객체 래퍼(Wrapper)를 생성한다.
```javascript
var user = new Object();
user.name = 'Sunny';
user.interests = ['Traveling', 'Swimming'];
user.greeting = function() {
    console.log('Hi, i\'m ' + this.name + '.');
};

user.greeting();
```

2. 객체 리터럴

간결한 코드를 위해 객체 리터럴을 사용 권장한다.
```javascript
var user = {
    name: 'Sunny',
    interests: ['Traveling', 'Swimming'],
    greeting: function() {
        console.log('Hi, i\'m ' + this.name + '.');
    }
}

user.greeting();
```

ES5부터 객체 리터럴에서 게터(getter)와 세터(setter) 접근자를 지원한다.
```javascript
var user = {
    get role() {
        return 'Engineer';
    }
}
user.role; // Engineer
```

3. 생성자 함수

```javascript
function User(name, interests) {
    this.name = name;
    this.interests = interests;
    this.greeting = function() {
        console.log('Hi, i\'m ' + this.name + '.');
    }
}

var user = User('Sunny', ['Travelling', 'Swimming']);
user.greeting();
```

4. Object.create()

```javascript
function User(name, interests) {
    this.name = name;
    this.interests = interests;
}

User.prototype.greeting = function() {
    console.log('Hi, i\'m ' + this.name + '.');
}

var user = Object.create(User.prototype, {
    name: { value: 'Sunny'},
    interests: { value: ['Travelling', 'Swimming'] }
});

user.greeting();
```

5. 생성 함수

```javascript
function createUser(name, interests) {
    var user = {};
    user.name = name;
    user.interests = interests;
    user.greeting = function() {
        console.log('Hi, i\'m ' + this.name + '.');
    };

    return user;
}

var user = createUser('Sunny', ['Traveling', 'Swimming']);
user.greeting();
```

6. ES6의 클래스

```javascript
class User {
    constructor(name, interests) {
        this.name = name;
        this.interests = interests;
    }

    greeting() {
        console.log('Hi, i\'m ' + this.name + '.');
    }
}

let user = User('Sunny', ['Traveling', 'Swimming']);
user.greeing();
```

### 객체, 프로퍼티, 프로퍼티 속성

자바스크립트에서 객체는 프로퍼티(property)의 집합이다.  
자바스크립트에서 속성(attribute)는 프로퍼티(property)의 상태를 정의하고 설명한다.  
속성(attribute)에 따라서 프로퍼티(property)는 데이터 프로퍼티(data property)와 접근 프로퍼티(access property)로 구분한다.  

<div align="center">
    <img src="./images/object-property-attribute.png" width="500" />
</div>

**# 객체 프로퍼티 접근**  

객체 프로퍼티를 접근하는 방식은 점 표기법과 대괄호 표기법이 있다.  
점 표기법은 자바의 점 표기법과 유사하다.  
대괄호 표기법에서 객체를 사용한다면 `toString` 메소드를 호출해서 문자열로 변환된다.

```javascript
var obj = {};
obj['100'] = 'one hundred';
console.log(obj[100]); // one hundred

var foo = { prop: 'f'}, bar = { prop: 'b'};
obj[foo] = 'Foo';
console.log(obj[bar]) // Foo
```

**# 객체 프로퍼티 수정**

`Object.defineProperty` 또는 `Obejct.defineProperties`를 사용해 객체의 프로퍼티를 수정한다.

```javascript
function User(name, department) {
    var _department = department;
    var _name = name;

    Object.defineProperty(this, 'name', {
        value: _name,
        writable: true,
        enumerable: true,
        configurable: false
    });

    Object definProperty(this, 'department', {
        get: function() {
            console.log('Retrieving department');
            return _department;
        },
        set: function(newValue) {
            console.log('Updating department value to "' + newValue + '"');
            _department = newValue;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(this, 'greeting', {
        value: function() {
            console.log('Hi i\'m ' + _name + '.');
        },
        enumerable: false,
        configurable: false
    });
}
```

1. name
    * 데이터 프로퍼티
    * `value` 속성에 의해서 `_name` 값 사용
    * `writable` 속성에 의해서 값 변경 가능
    * `enumerable` 속성에 의해서 `for ... in` 구문에서 열거형으로 사용 가능
    * `configurable` 속성은 `false`이므로 프로퍼티 변경은 불가능
2. department
    * 데이터 프로퍼티와 접근자 프로퍼티
    * `get` 속성과 `set` 속성에 의해서 실제 값 `_department`가 사용될 때 로그 출력
3. greeting
    * 데이터 프로퍼티
    * `value` 속성으로 함수 객체가 연결된 데이터 프로퍼티

### 프로토타입과 상속

**프로토타입**은 다른 객체와 공유할 수 있는 **공유 프로퍼티(shared property)** 를 가진 객체이다.  
함수 객체 만이 프로토타입 객체를 가질 수 있다.


**# 프로토타입을 활용한 상속**

자식은 부모의 프로토타입을 상속받아서 사용하거나 재정의할 수 있다.

<div align="center">
    <img src="./images/prototype-relation.png" width="500" />
</div>


```javascript
/* Parent Class */
function User(name, interests) {
    this.name = name;
    this.interests = interests;
}

User.prototype.greeting = function() {
    console.log('Hi, i\m ' + this.name + '.');
}

/* Child Class */
function TeamMember(name, interests, task) {
    User.call(this, name, interests);  // 부모를 호출하는 super()와 같은 역할
    this.task = task;
}

TeamMember.prototype = Object.create(User.prototype);
TeamMember.prototype.greeting = function() {
    console.log('I\'m ' + this.name + '. Welcome to the team!');
}
TeamMember.prototype.work = function() {
    console.log('I\'m working on ' + this.tasks.length + ' tasks.');
}

var member = TeamMember('Sunny', ['Traveling'], ['Buy three tickets', 'Book a hotel'])
member.greeting();  // I'm Sunny. Welcome to the team!
member.work();      // I'm working on 2 tasks

User.prototype.eat = function() {
    console.log('What will I have for launch?');
}
member.eat();       // What will I have for launch?

Object.prototype.move = function() {
    console.log('Every object can move now');
}
member.move();      // Every objefct can move now

var alien = {};
alien.move();       // Every objefct can move now
User.move();        // Every objefct can move now
```

### 스코프와 클로저

자바스크립트에서 스코프(scope)는 **전역 스코프(global scope)**, **함수 스코프(function scope)**, **블록 스코프(block scope)** 가 있다.  
클로저(closure)는 중첩된 함수를 의미하며, 상위 함수의 스코프의 변수를 사용할 수 있다.

```javascript
function bookHotel(city) {
    var availableHotel = 'None';

    for (var i = 0; i < hotesl.length; i++) {
        var hotel = hotels[i];
        if (hotel.city === city && hotels.hasRoom) {
            availableHotel = hotel;
            break;
        }
    }

    console.log('Checked ' + (i + 1) + ' record(s)');
    console.log('Last Checked ' + hotel.name;
    {
        function placeOrder() {
            var totalAmount = 200;
            console.log('Order placed to ' + availableHotel);
        }
    }
    placeOrder()

    return availableHote;
}

var hotels = [
    {name: 'Hotel A', hasRoom: false, city: 'Sanya'},
    {name: 'Hotel B', hasRoom: true, city: 'Sanya'}
];
console.log(bookHotel('sanya'));
```

### this 키워드

자바스크립트에서 `this`는 실행 컨텐스트 객체를 의미한다.  
자바스크립트의 `this`의 의미는 유동적이다. 전역 컨텍스트, 객체 컨텐스트가 될 수 있다.

```javascript
function User(name) {
    console.log('i\'m in "' + this.constructor.name + '" context.');

    this.name = name;
    this.speak = function() {
        console.log(this.name + ' is speaking from "' + this.constructor.name + '" context');

        var drink = function() {
            console.log('Drinking in "' + this.constructor.name + '"');
        }
        drink();
    };

    function ask() {
        console.log('Asking from "' + this.constructor.name + '" context');
        consoel.log('Who am I? "' + this.constructor.name + '"');
    }
    ask();
}

var name = 'Unknown';
var user = new User('Ted');
user.speak();
```
실행 결과
```text
I'm in "User" context
Asking from "Window" context
Who am I? "Unkonw"
Ted is speaking from "User" context
Drinking in "Window"
```

**# 함수 호출과 컨텍스트**
1. 생성자 함수 호출: `new User()`
    * `this`는 생성자로 생성된 객체 컨텐스트를 의미한다.
2. 직접 함수 호출: `ask()`
    * `this`는 전역 컨텐스트를 의미한다.
3. 메소드 호출: `user.speak()`
    * `this`는 `speak()` 메소드가 속한 객체 컨텐스트를 의미한다.
4. 컨텓스트 변경 호출: `ask.call(this)` 또는 `ask.apply(this)`
    * `this`는 인자로 전달받은 컨텍스트를 의미한다.

### 호이스팅

호이스팅(hoisting)은 자바스크립트의 독특한 특징으로 스크립트 인터프리터가 함수 선언과 대입 표현식 없는 변수 선언을 최상위로 이동시키는 것을 의미한다.  

호이스팅(hoisting)으로 다음과 같은 코드가 자바스크립트에서 동작할 수 있다.
```javascript
travel = 'no plan';
var travel;
console.log(travel) 

function travel() {
    console.log('Traveling');
}
travle();
```
호이스팅으로 코드가 변경된다
```javascript
function travel() {
    console.log('Traveling');
}

var travel;
travel = 'no plan';
console.log(travel) // print 'no plan'

travle();           // Uncaugh Type Error
```

## ES6 기본
### 블록 스코프, let, const

ES6에서 변수는 `let` 상수는 `const`를 사용한다.  
`let`과 `const`는 호이스팅을 적용받지 않는다.

### 클래스

ES6에서 프로토파입 기반의 상속이 아닌 클래스 문법 기반의 상속이 이루어진다.

```javascript
class User {
    constructor(name, interests) {
        this.name = name;
        this.interests = interests;
    }

    greeting() {
        console.log('Hi I\'m ' + this.name + '.');
    }

    get interestsCount() {
        return this.interests ? this.interests.length : 0;
    }
}

class TeamMember extends User {
    constructor(name, interests) {
        super(name, interests);
        this._tasks = [];
        this._welcomeText = 'Welcome to the team!';
    }

    greeting() {
        console.log('I\'m ' + this.name + '. ' + this._welcomeText);
    }

    work() {
        console.log('I\'m working on ' + this._tasks.length + ' tasks.');
    }

    set tasks(tasks) {
        let acceptedTasks = [];

        if(tasks.length > TeamMember.maxTasksCapacity()) {
            acceptedTasks = tasks.slice(0, TemMember.maxTaskCapacity());
            console.log('It\'s over max capacity. Cna only task two.');
        } else {
            acceptedTasks = tasks;
        }
        
        this._tasks = this._tasks.concat(acceptedTasks);
    }

    static maxTasksCapacity() {
        return 2;
    }
}

let member = new TeamMember('Sunny', ['Traveling']);
member.greeting();      // I'm Sunny. Welcome to the team
member.tasks = ['Buy three tickets', 'Book a hotel', 'Rent a car'] // It's over max capacity. Can only take two
member.work();          // I'm working on 2 tasks
console.log(member.interestsCount)  // 1
member.interestsCount = 2;          // not working → set property is not implemented
console.log(member.interestsCount)  // 1

console.log(member.tasks)           // undefined → get property is not implemented 
```

### 강화된 객체 리터럴

**# ES6에서 객체 리터럴(object literal)에서 지원하는 기능**  
1. 프로토타입 설정
2. 프로퍼티 축약 표현
3. 메소드 축약 표현
4. super 호출
5. 프로퍼티 계산 기능

```javascript
const advice = 'Stay hungry. Stay foolish.';

let advisor = {
    // 1. 프로토타입 설정
    __proto__: new TeamMember('Adam', ['Consulting']),  
    
    // 2. 프로퍼티 축약 표현
    advice,                                             
    
    //3. 메소드 축약 표현
    greeting() { 
        // 4. super 호출
        super.greeting();
        console.log(this.advice);
    },
    
    // 5. 프로퍼티 계산 기능
    [advice.split('.')[0]]: 'Always learn more'
}
```

### 화살표 함수

ES6의 화살표 함수(Arrow Function)은 함수 축약 표현이다.

**# 화살표 함수 사용 규칙**  
1. 인자가 없는 경우 빈 괄호 세트가 필요하다.
2. 하나의 인자가 있는 경우 괄호를 생략할 수 있다.
3. 함수가 객체 리터럴을 반환할 때에는 괄호로 감싼다.
4. 함수가 구문들로 이루어진 경우 결과를 반환할 때 return 구문이 필요하다.
   1. 함수에 중괄호를 사용한다면 함수 본문은 여러 명령문으로 구성한다.

```javascript
const fruites = [
    {name: 'apple', price: 100},
    {name: 'orange', price: 80},
    {name: 'banana', price: 120},
];

// 1. 인자가 없는 경우 빈 괄호 세트가 필요하다
var countFruites = () => fruites.length;

// 2. 하나의 인자가 있는 경우 괄호를 생략할 수 있다.
fruits.filter(fruit => fruit.price > 100);

// 3. 함수가 객체 리터럴을 반환할 때에는 괄호로 감싼다.
var inventory = fruits.map(fruit => ({name: fruit.name, storage: 1}));

// 4. 함수가 구문들로 이루어진 경우 결과를 반환할 때 return 구문이 필요하다.
var inventory = fruits.map(fruit => {
    console.log('Checking ' + fruit.name + ' storage');
    return { name: fruit.name, storage: 1};
});

//4-1. 함수에 중괄호를 사용한다면 함수 본문은 여러 명령문으로 구성한다.
var sum = (a, b) => { return a + b; } // undefined
var sum = (a, b) => a + b;
```

**# 화살표 함수의 this**  

화살표 함수는 상위 스코프의 실행 컨텍스트를 활용한다. 

```javascript
var name = 'Unknown';
var greeting = () => {
    console.log('Hi, I\'m ' + this.name);
}

greeting.call({ name: 'Sunny' });   // Hi, I'm Unknown
greeting.apply({ name: 'Tod' });    // Hi, I'm Unknown

var newGreeting = greeting.bind({ name: 'James' })  
newGreeting()                       // Hi, I'm Unknown
```

이러한 화살표 함수의 특징으로 객체의 메소드를 정의하는데 적합하지 않다.  


**# 화살표 함수의 프로토타입**  

화살표 함수는 프로토타입 객체를 가지지 않는다.  
프로토타입 객체를 가지지 않으므로 생성자 함수도 가질 수 없다. (`new` 호출 불가)

### 매개변수 기본값

ES6에서는 매개변수의 기본값을 설정할 수 있다

```javascript
const shoppingCart = [];
function addToCart(item, size=1) {
    shopprintCart.push({item: item, count: size});
}
addToCart('Apple');
addToCart('Orange', 2);
```

### 나머지 매개변수

ES6에서 `...`를 함수 선언에 적용하면 나머지 매개변수를 나타낼 수 있다.

```javascript
function wordkout(exercise1, ...todos) {
    console.log('Start from ' + exercise1);
    consoel.log(todos.length + ' more to do');
}
workout('Treadmill', 'Pushup', 'Spinning');
```

### 전개 구문

ES6에서 `...`를 배열에 적용하면 전개 구문을 나타낼 수 있다.

```javascript
let urgentTasks = ['Buy three tickets'];
let normalTasks = ['Book a hotel', 'Rent a car'];
let allTasks = [...urgetntasks, ...normalTasks];

((first, second) => {
    console.log('Worknig on ' + first + ' and ' + second)
})(...allTasks);
```

### 비구조화 할당

ES6의 비구조화 할당으로 배열 내의 요소, 문자열 내의 문자, 객체 내의 프로퍼티를 분리하고 배열 리터럴, 객체 리터럴과 비슷한 구문으로 구분된 변수를 할당할 수 있다.

**# 객체 비구조화**  

```javascript
let user = {name: 'Sunny', interests: ['Traveling', 'Swimming']};
let {name, interests, tasks=[]} = user;

console.log(name);      // Sunny
console.log(interests); // ['Trabeling'. 'Swimming']
console.log(tasks);     // []
```

**# 배열 비구조화** 

```javascript
let [first, , third] = ['Traveling', 'Swimming', 'Shopping']
console.log(first)  // Traveling
console.log(third)  // Shopping
```

**# 중첩 비구조화**  

```javascript
let user = {name: 'Sunny', interests: ['Traveling', 'Swimming']};
let {interests: [, second]} = user;

console.log(second);    // Swimming
console.log(interests); // ReferenceError
```

**# 나머지 요소 비구조화**  

```javascript
let [first, ...others] = ['Traveling', 'Swimming', 'Shopping'];
console.log(others);    // ['Swimming', 'Shopping']
```

**# 함수 매개변수 비구조화**

```javascript
function workout({gym}, times) {
    console.log('Workout in ' + gym + ' for ' + times + ' times');
}

let thisWeek = {gym: 'Gym A'};
workout(thisWeek, 2)    // Workout in Gym A for 2 times
```

### 템플릿 리터럴

템플릿 리터럴은 문자열 리터럴에 표현식과 여러 라인 출력을 지원하는 기능이다.  

```javascript
let user = {
    name: 'Ted',
}
let greeting = `Hello I'm ${user.name}`
```

### 모듈

ES6는 언어 차원에서 모듈을 지원하며 `import`와 `export`를 활용한다.

**# 내보내기(export)**  
명명된 내보내기(named export)와 기본 내보내기 내보내기(default export)로 구분한다

```javascript
// default export
export default function completeTask(user) {
    console.log(`{user.name} completed a task`);
    completedCount++;
}

// named export
export let completedCount = 0;
```
**# 가져오기(import)**  

외부 파일에서 내보낸(export)한 변수를 가져올(import) 수 있다

```javascript
import completeTask from './tasks.js'
import {completedCount} from './tasks.js'
```

### 프로미스

ES6부터 비동기 콜백을 지원하는 프로미스 기능이 추가되었다.

```javascript
function getProjects() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([{id: 1, name: 'Project A'}, {id: 2, name: 'Project B'}, 100);
        });
    });
}

function getTasks(projects) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({projects, tasks: ['Buy three tickets', 'Book a hotel']});
        }, 100);
    })
}

function render({projects, tasks}) {
    console.log(`Render ${projects.length} projects and ${tasks.length} tasks`)
}

getProjects()
    .then(getTasks)
    .then(render)
    .catch((error) => {
        console.log('Heandling error', error);
    });
```

**# Promise 동작**  

Promise 생성자 함수는 매개변수로 하나의 함수를 가진다.  
Promise의 매개변수인 함수는 resolve와 reject 함수가 인자로 전달된다.  
비동기 작업이 완료되면 resolve가 호출된다. 작업이 실패하면 reject가 호출된다.  
