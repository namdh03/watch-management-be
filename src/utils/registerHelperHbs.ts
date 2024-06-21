import { HelperOptions } from 'handlebars'
import moment from 'moment'

const registerHelperHbs = {
  setVar: function (varName: string, varValue: unknown, options: HelperOptions) {
    options.data.root[varName] = varValue
  },
  ifEquals: function (arg1: unknown, arg2: unknown, options: HelperOptions) {
    return arg1 === arg2 ? options.fn(this) : options.inverse(this)
  },
  ifNotEquals: function (arg1: unknown, arg2: unknown, options: HelperOptions) {
    return arg1 !== arg2 ? options.fn(this) : options.inverse(this)
  },
  parseJSON: function (context: string) {
    if (context.length > 0) {
      return JSON.parse(context)
    }
  },
  range: function (n: number, block: HelperOptions) {
    let accumulator = ''
    for (let i = 1; i <= n; ++i) {
      accumulator += block.fn(i)
    }
    return accumulator
  },
  greaterThan: function (arg1: number, arg2: number, options: HelperOptions) {
    return arg1 > arg2 ? options.fn(this) : options.inverse(this)
  },
  lessThan: function (arg1: number, arg2: number, options: HelperOptions) {
    return arg1 < arg2 ? options.fn(this) : options.inverse(this)
  },
  greaterThanOrEquals: function (arg1: number, arg2: number, options: HelperOptions) {
    return arg1 >= arg2 ? options.fn(this) : options.inverse(this)
  },
  lessThanOrEquals: function (arg1: number, arg2: number, options: HelperOptions) {
    return arg1 <= arg2 ? options.fn(this) : options.inverse(this)
  },
  isDefined: function (value: unknown) {
    return value !== undefined
  },
  toLocaleString: function (value: number) {
    return value.toLocaleString()
  },
  formatDate: function (date: Date, format: string) {
    return moment(date).format(format)
  }
}

export default registerHelperHbs
