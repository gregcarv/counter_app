import TitleElem from './TitleElem.js'
import TextElem from './TextElem.js'
import CounterElem from './CounterElem.js'
import ButtonElem from './ButtonElem.js'

const socket = io();

export default {
  name: 'App',
  components: {
    TitleElem,
    TextElem,
    CounterElem,
    ButtonElem
  },

  template: `
    <div id="app">
    <TitleElem text="Increment / Decrement Counter" />
    <TextElem text="Click a button below to increment or decrement the counter" />
    <p>{{ this.connected }}</p>
    <CounterElem :countValue="this.count" />
    <div id="buttons">
      <ButtonElem @click.native="updateCount('increment')" :class="'increment'" text="+" /> <ButtonElem @click.native="updateCount('decrement')" :class="'decrement'" text="-" />
    </div>
    </div>
  `,

  data: function () {
    return {
      count: 0
    }
  },

  created() {
    // Listens for updated count from server
    socket.on('countUpdated', (count) => {
      console.log(`Update count to ${count}`);
      this.count = count;
    });
  },

  mounted() {
    // Listens for initial count from server
    socket.on('startCount', (startCount) => {
      console.log(`Reset count to ${startCount}`);
      this.count = startCount;
    });
  },

  methods: {
    /**
     * Sends a request to the server to update the count
     * 
     * @param {string} instruction 
     */
    updateCount: function (instruction) {
      const text = instruction;
      socket.emit('updateCount', [text, this.count]);
    }
  }
};
