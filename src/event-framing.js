/*
 * EventFraming - Global event manager to trigger events within specific time range for better performance 
 * https://github.com/kyashan
 * (c) 2015 MIT License
 */

var eventFraming = (function() {

	"use strict"

	var exp = {},
		storage = {},
		queue = [],
		reserved = false,
		index = 0,
		timer = 200,
		clear;

	function Evt(key, fn) {
		var that = this;
		this.index = key;
		this.fn = fn;
		return function(onStart){
			run(that, onStart);
		}
	}

	function store(fn) {
		index++;
		storage[index] = fn;
		return new Evt(index, fn);
	}

	function run(evt, onStart) {
		if (queue.indexOf(evt.index) == -1) {
			if (onStart) evt.fn(); 
			queue.unshift(evt.index);
		}
		if (reserved) return;
		reserved = true;
		clear = setTimeout(function(){
			for (var i = queue.length - 1; i >= 0; i--) {
				if (storage[queue[i]]) storage[queue[i]]();
				queue.splice(i, 1);
			};
			reserved = false;
		}, timer);
	}

	exp.register = function(fn) {
		if (typeof fn !== 'function') {
			console.error('Not a function');
		} else {
			return store(fn);
		}
	}

	exp.setTimer = function(milliseconds) {
		if (typeof milliseconds !== 'number') {
			return console.error('Not a number');
		}
		timer = milliseconds;
	}

	exp.clear = function() {
		clearTimeout(clear);
		queue = [];
		reserved = false;
	}

	return exp;

}());


