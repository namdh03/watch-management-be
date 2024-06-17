import { HelperOptions } from 'handlebars'

const registerHelperHbs = {
  setVar: function (varName: string, varValue: unknown, options: HelperOptions) {
    options.data.root[varName] = varValue
  },
  ifEquals: function (arg1: unknown, arg2: unknown, options: HelperOptions) {
    return arg1 == arg2 ? options.fn(this) : options.inverse(this)
  },
  parseJSON: function (context: string) {
    return JSON.parse(context)
  }
}

export default registerHelperHbs
