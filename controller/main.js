var _ = require('common/util');
var TextView = require('ui').TextView;
var VLayout = require('ui').VLayout;
var Control = require('ui').Control;
var db = require('../lib/db').DB;

_.extend(exports, {
	':load': function() {
		var self = this;
		self.clear();
		
		var title = new TextView({
			label: 'Powered by Primbon.com',
			style: {
				color: 'white',
				'font-size': 'small',
				'font-weight': 'normal',
				border: '0 0 4 0'
			}
		});
		
		var parent = new VLayout({
			style: {
				width: 'fill-parent'
			}
		});
		var control = new Control({
			style: {
				width: 'fill-parent'
			}
		});
		parent.add(control);
		parent.add(title);
		
		self.add('title', parent);
		
		var i = 1;
		db.forEach(function(item){
			var temp;
			if (i % 2 === 0) {
				temp = new TextView({
					label: item.title,
					style: {
						color: 'white',
						width: 'fill-parent',
						'background-color': '#504b4b'
					}
				});
				temp.on('blur', function(){
					this.style({
						'color': 'white',
						'background-color': '#504b4b'
					});
				});
			} else {
				temp = new TextView({
					label: item.title,
					style: {
						color: 'white',
						width: 'fill-parent',
						'background-color': '#2e2e2e'
					}
				});
				temp.on('blur', function(){
					this.style({
						'color': 'white',
						'background-color': '#2e2e2e'
					});
				});
			}
			temp.on('activate', function(){
				app.setContent('detail', {url: item.url, title: item.title});
			});
			temp.on('focus', function(){
				this.style({
					'color': 'black',
					'background-color': '#eeeeee'
				});
			});
			
			self.add(item.url, temp);
			
			i++;
		});
	},
	
	':keypress': function(key) {
		if (this.index === undefined) {
			if (this.size() > 1) {
				this.focusItem(1);
			}
		} else if (key === 'up' || key === 'down') {
			var next = this.index + (key === 'up' ? -1 : 1);

			if (next < 1) {
				next = 1;
			} else if (next > (this.size()-1)) {
				next = this.size()-1;
			}

			if (this.index === next) {
				return;
			}

			this.focusItem(next);
		} else if (key === 'fire') {
			this.get(this.index).emit('activate');
		}
	},
	
	focusItem: function(index) {
		if (this.index !== undefined) {
			this.get(this.index).emit('blur');
		}
		this.index = index;
		this.get(index).emit('focus');
		if (index === 1) {
			this.scrollTop(0);
		}
		this.scrollTo(index);
	}
});
