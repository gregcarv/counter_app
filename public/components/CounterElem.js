export default {
  name: 'CounterElem',
  props: {
    countValue: Number
  },
  template: `<div id="count">{{ countValue }}</div>`
}