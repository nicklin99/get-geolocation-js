
export default class BaseLocation{

  constructor(opts) {
    this.opts = opts
  }

  get type() {
    return this.opts.type
  }

  get options(){
    return this.opts
  }

  set options(opts) {
    this.opts = opts
  }
}