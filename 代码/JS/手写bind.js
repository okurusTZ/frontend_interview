const { func } = require("prop-types")

Function.prototype.myBind = function() {
  args = Array.from(arguments);
  _this = args.shift();
  const self = this;
  return () => {
    return self.apply(_this, args)
  }
}