
export default {
  template: `<div>{{ stream }}</div>`,
  computed: {
    stream() {
      return this.$store.state.streamText
    }
  }
}


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
