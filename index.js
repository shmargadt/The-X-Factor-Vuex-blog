import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)



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


const store = new Vuex.Store({
  state: {
    streamText: '',
    constTextsArr:
      [
        { title: 'store and more', footer: '@shmargadt' },
        { title: 'Vuex', footer: '@tomers' }
      ]
  },
  getters: {
    streamLength: state => {
      return state.streamText.length
    },
    titles: state => {
      return state.constTextsArr.filter(constTexts => constTexts.title)
    }
  },
  ...
  mutations: {
    addStreamText (state) {
      const radix = 36;
      const startAfterPointIndex = 2;
      const constEndIndex = 5;
      state.streamText +=  Math.random().toString(radix).substring(startAfterPointIndex, constEndIndex);
    }
  }
})

store.commit('addStreamText')





const store = new Vuex.Store({
  state: {
    streamText: '',
    constTextsArr:
      [
        { title: 'store and more', footer: '@shmargadt' },
        { title: 'Vuex', footer: '@tomers' }
      ]
  },
  getters: {
    streamLength: state => {
      return state.streamText.length
    },
    titles: state => {
      return state.constTextsArr.filter(constTexts => constTexts.title)
    }
  },
  ...
  mutations: {
    addStreamText (state, payload) {
      state.streamText +=  payload.streamTextAsPayload;
    }
  }
})

const radix = 36;
const startAfterPointIndex = 2;
const constEndIndex = 5;
const streamTextAsPayload =  Math.random().toString(radix).substring(startAfterPointIndex, constEndIndex);
 
store.commit('addStreamText', {streamText: streamTextAsPayload})



const store = new Vuex.Store({
  state: {
    streamText: '',
    constTextsArr:
      [
        { title: 'store and more', footer: '@shmargadt' },
        { title: 'Vuex', footer: '@tomers' }
      ]
  },
  getters: {
    streamLength: state => {
      return state.streamText.length
    },
    titles: state => {
      return state.constTextsArr.filter(constTexts => constTexts.title)
    }
  },
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






const store = new Vuex.Store({
  state: {
    streamText: '',
    constTextsArr:
      [
        { title: 'store and more', footer: '@shmargadt' },
        { title: 'Vuex', footer: '@tomers' }
      ]
  },
  getters: {
    streamLength: state => {
      return state.streamText.length
    },
    titles: state => {
      return state.constTextsArr.filter(constTexts => constTexts.title)
    }
  },
  ...
  mutations: {
    addStreamText (state) {
      const radix = 36;
      const startAfterPointIndex = 2;
      const constEndIndex = 5;
      state.streamText +=  Math.random().toString(radix).substring(startAfterPointIndex, constEndIndex);
    }
  },
  actions: {
    addStreamText ({ commit }) {
      // commit without any parms and not as Commit style
      commit('addStreamText')
    }
  }
})

store.dispatch('addStreamText')



import { Logger } from './services/logger'

const store = new Vuex.Store({
  state: {
    streamText: '',
    constTextsArr:
      [
        { title: 'store and more', footer: '@shmargadt' },
        { title: 'Vuex', footer: '@tomers' }
      ]
  },
  getters: {
    streamLength: state => {
      return state.streamText.length
    },
    titles: state => {
      return state.constTextsArr.filter(constTexts => constTexts.title)
    }
  },
  ...
  mutations: {
    addStreamText (state, payload) {
      state.streamText +=  payload.streamTextAsObjectStyleCommit;
    }
  },
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



-----------------

const modulestreamText = {
  state: { 
    streamText: '' 
  },
  mutations: {     
    addStreamText (state, payload) {
    state.streamText +=  payload.streamTextAsObjectStyleCommit;
    } 
  },
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
  },
  getters: {     
    streamLength: state => {
    return state.streamText.length
    } 
  }
}

const moduleConstTexts = {
  state: { 
    constTextsArr:
    [
      { title: 'store and more', footer: '@shmargadt' },
      { title: 'Vuex', footer: '@tomers' }
    ] 
  },
  getters: {

    titles: state => {
      return state.constTextsArr.filter(constTexts => constTexts.title)
    }
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

