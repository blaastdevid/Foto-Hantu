var _ = require('common/util');
var ImageView = require('ui').ImageView;
var app = this;


_.extend(exports, {
	
	':state': function(param) {
		console.log(param.url);
		var self = this;
		self.clear();
		self.add('pic', new ImageView({
			style: {
				width: 'fill-parent',
				height: 'fill-parent',
				mode: 'centered'
			}
		}));
		self.get('pic').resource(param.url);
	}
});