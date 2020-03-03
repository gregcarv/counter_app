export default {
  name: 'ButtonElem',
  props: {
    text: String
  },
  template: `<button :class="'button'"><span>{{ text }}</span></button>`
}