/**
	jQuery.childmap v0.1
	Dave Taylor http://the-taylors.org/jquery.childmap/

	@license The MIT License (MIT)
	@preserve Copyright (c) 2012 Dave Taylor http://the-taylors.org
*/
/*global define,require */
(function($){
	'use strict';

	var childIdCount = 0;

	var Childmap = function(el, options){
		if (el || options){
			this.init(el, options);
		}
	};
	Childmap.prototype = {
		defaults: {
			zoom: 0.2,
			refresh: 500 
		},
		maps: [],
		init: function(el, options){
			var self = this;
			this.$el = $(el);
			this.settings = $.extend({}, this.defaults, options);
			this.$el.addClass('childmap-active');

			this.mapChildren();

			return this;
		},
		mapChildren: function(){
			var self = this;
			this.settings.parent.children().each(function(i){
				var $this = $(this),
					id = this.id = this.id || 'childmap-' + childIdCount++,
					$childMap = self.maps[id]
				;
				if (!$childMap){
					$childMap = $('<a href="#'+ id +'" class="childmap-child"></a>');
					self.maps[id] = $childMap;
					self.$el.append($childMap);
				}
				self.positionChild($this, $childMap);
			});
			self.$el.css({
				width: Math.floor(self.settings.parent.width() * self.settings.zoom),
				height: Math.floor(self.settings.parent.height() * self.settings.zoom)
			});
			setTimeout(function(){
				self.mapChildren();
			}, self.settings.refresh);
		},
		positionChild: function($child, $map){
			var pos = $child.position(),
				mappedValues = {
					top: Math.floor(pos.top * this.settings.zoom),
					left: Math.floor(pos.left * this.settings.zoom),
					width: Math.floor($child.width() * this.settings.zoom),
					height: Math.floor($child.height() * this.settings.zoom)
				}
			;
			$map.css(mappedValues);
			return mappedValues;
		}
	};

	$.fn.childmap = function(options) {
		return this.each(function(){
			var childmap = new Childmap(this, options);
		});
	};

}(window.jQuery));