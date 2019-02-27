import { VantComponent } from '../common/component'
import { iphonex } from '../mixins/iphonex'
VantComponent({
  mixins: [iphonex],
  classes: ['bar-class', 'price-class', 'button-class'],
  props: {
    tip: null,
    type: Number,
    price: String,
    label: String,
    loading: Boolean,
    disabled: Boolean,
    buttonText: String,
    currency: {
      type: String,
      value: '¥'
    },
    buttonType: {
      type: String,
      value: 'danger'
    }
  },
  computed: {
    hasPrice: function hasPrice () {
      return true
    },
    priceStr: function priceStr () {
      return this.data.price
    },
    tipStr: function tipStr () {
      var tip = this.data.tip
      return typeof tip === 'string' ? tip : ''
    }
  },
  methods: {
    onSubmit: function onSubmit (event) {
      this.$emit('submit', event.detail)
    }
  }
})
