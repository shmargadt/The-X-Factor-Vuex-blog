# The X Factor - Vuex

According to the dictionary, X-factor is “a quality that you cannot describe, that makes someone very special”. Vuex is probably the opposite. Vuex is all about controlling the flow inside the app — and making it as simple to understand as possible, even though it has its own X-factor. Vuex is a library that implements a state management pattern for Vue.js applications. As a state management pattern, the state can only be mutated in a predictable fashion. In this blog, I will describe the simpleness of Vuex, and make the X factor simple.

## What’s in store
The store is an object that contains a state and all the functionalities the application needs in order to get the state values and mutate it. The change of the state will always be synchronological. 
In the store there are five main parts:

## State
The state is a single source of truth. It is a global object which determines the specific state of the whole application. Every component has a derived state from this single source. Any change in this derived state will effect the global state and vice versa.

*How do we use it?*

- First, the Vuex will be declared on the index file:
```javascript
//index.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
```

- Second, the state object will be declared in the store object:
```javascript
//index.js
const store = new Vuex.Store({
 state: {
   streamText: '',
   constTextsArr:
     [
       { title: 'store and more', footer: '@shmargadt' },
       { title: 'Vuex', footer: '@tomers' }
     ]
 }
})
```


- Third, the derived state from the global state will be used on the relevant component:
```javascript
//Stream.js
export default {
 template: `<div>{{ stream }}</div>`,
 computed: {
   stream() {
     return this.$store.state.streamText
   }
 }
}
```



## Getters
Getters are functions which are used to calculate data based on the global state. It helps to reduce the size of the state, and to get much more data from it.  

*How do we use it?*

The Getters will be declared on the store object most of the time. In this example one Getter returns the length of streamText state, and the second one filters the constsTextArr state.
```javascript
//index.js
const store = new Vuex.Store({
 ...
 getters: {
   streamLength: state => {
     return state.streamText.length
   },
   titles: state => {
     return state.constTextsArr.filter(constTexts => constTexts.title)
   }
 }
 ...
})
```

If this calculation is relevant only for one component, it can be made only in the relevant component under the computed section. 
```javascript
//Stream.js
export default {
 template: `<div>{{ stream }}. Text length: {{ streamLength }}</div>`,
 computed: {
   stream() {
     return this.$store.state.streamText
   },
   streamLength() {
     return this.$store.state.streamText.length
   }
 }
}
```

> “You must be the change you wish to see in the world.” Mahatma Gandhi
## Mutations

As Mahatma Gandhi said, if you want the state to be changed you must write a Mutation. The Mutations are pure functions which take the state as a parameter with or without additional parameters, and return the new state without any side effects. Vuex will update the new state as the global state.

*How do we use it?*

Mutations will be declared on the store object.
```javascript
//index.js
const store = new Vuex.Store({
 ...
 mutations: {
   addStreamText (state) {
     const radix = 36;
     const startAfterPointIndex = 2;
     const constEndIndex = 5;
     state.streamText +=    Math.random().toString(radix).substring(startAfterPointIndex, constEndIndex);
   }
 }
})
```

Mutations use the reserved word commit which apply the mutation.
```javascript
store.commit('addStreamText')
```

The commit style approach is an object oriented approach. In this approach, the mutation gets an object as an input. The properties of the object will be Type, and Payload field.
```javascript
//index.js
const store = new Vuex.Store({
 ...
 mutations: {
   addStreamText (state, payload) {
     state.streamText +=  payload.streamTextAsObjectStyleCommit;
   }
 }
})

const radix = 36;
const startAfterPointIndex = 2;
const constEndIndex = 5;
const streamTextAsObjectStyleCommit =  Math.random().toString(radix).substring(startAfterPointIndex, constEndIndex);

store.commit({ type: 'addStreamText', streamText: streamTextAsObjectStyleCommit })
```

The mutations are the best practice in sync operations, but what about async operations? how can it be done?


**"An async action!"**  
**"knock, knock"**  
**"Who's there?"**
## Actions

Actions are an async operation. This functionality covers all kinds of operations the application needs. Each action can commit changes to the state while getting the response of the async operation, or dispatch another action while getting it. 

*How do we use it?*

On the following code, the async operation is API call. The action calls the api in order to check if more stream text is needed asserting by the length of the text. If the API call returns with yes/no answer the action triggers a commit. If the call fails, the action just logs it.
```javascript
//index.js
import { Logger } from './services/logger'
…

const store = new Vuex.Store({
 ...
 actions: {
   addStreamText ({ commit, state }) {
     // the Streamer API accepts a success callback and a failure callback
     Streamer.getStreamText(
       //params for the API
       state.streamText.length,
       // handle success
       (resp) => commit({type: 'addStreamText', streamTextAsObjectStyleCommit: resp.data.streamText}),
       // handle failure
       (resp) => Logger.error('getStreamText from server failed', resp.data.errorType)
     )
   }
 }
})

store.dispatch('addStreamText')
```

Dispatching an action will be triggered inside a component:
```javascript
import { mapActions } from 'vuex'

export default {
 template: `<div><div>{{ stream }}. Text length: {{ streamLength }}</div> <button> </button></div>`,
 computed: {
   stream() {
     return this.$store.state.streamText
   },
   streamLength() {
     return this.$store.state.streamText.length
   }
 },
 methods: {
   ...mapActions([
     'addStreamText', // map `this.addStreamText()` to `this.$store.dispatch('addStreamText')`
   ])
 }

}
```


## Modules - don't put all eggs in one basket
When our application gets bigger the state mostly gets bigger with it. In order to keep our store readable and all its context, we will break our state into small modules. Each module will contain its own context - state, getters, actions mutations. The global state will be composed by all the modules states.

*How do we use it?*
```javascript
//index.js
const modulestreamText = {
 state: {
   streamText: ''
 },
 mutations: {    
   addStreamText (state, payload) { ….}
  },
 actions: {    
   addStreamText ({ commit, state }) {
  ….
   }
 },
 getters: {    
   streamLength: state => {
  ....
   }
 }
}

const moduleConstTexts = {
 state: {
   constTextsArr: ...
 },
 getters: {
   titles: state => {...}
 }
}

const store = new Vuex.Store({
 modules: {
   streamText: modulestreamText,
   ConstTexts: moduleConstTexts
 }
})

store.state.streamText // -> `modulestreamText`'s state
store.state.ConstTexts // -> `moduleConstTexts`'s state
```

> “That was extraordinary. Unfortunately, extraordinarily bad. “
##### - simon cowell, judge of The X Factor

Vuex is an extraordinary pattern, extraordinarily good. Implementing the flux pattern by declaring a state and mutating it in a synchronized way makes the application flow simple, maintainable, a one-way flow. As Dan Abramov said:
“Flux libraries are like glasses: you’ll know when you need them.“. 
Vuex is waiting for you to wear its glasses, start wearing it now.


