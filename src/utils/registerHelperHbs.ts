import { HelperOptions } from 'handlebars'

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
  }
}

export default registerHelperHbs
