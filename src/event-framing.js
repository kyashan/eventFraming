var eventFraming = (function(){

	"use strict"

	var exp = {},
		storage = {},
		queue = [],
		reserved = false,
		index = 0,
		timer = 600,
		clear;

	function Evt(key, fn){
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
		console.log(storage);
		return new Evt(index, fn);
	}

	function unstore(i) {
		delete storage[i];
	}

	function run(evt, onStart) {
		if (queue.indexOf(evt.index) == -1) {
			if (onStart) evt.fn(); //Così chiama la prima volta subito i metodi. Se lo tolgo, appena faccio l'azione chiama il metodo solo dopo il timer
			queue.unshift(evt.index);
		}

		if (reserved) return;
		reserved = true;
		clear = setTimeout(function(){
			//Esegui tutte le funzioni in attesa e poi rimuovile
			for (var i = queue.length - 1; i >= 0; i--) {
				if (storage[queue[i]]) storage[queue[i]]();
				queue.splice(i, 1);
			};
			reserved = false;
		}, timer);
	}

	//Registra la funzione nello storage
	exp.register = function(fn) {
		if (typeof fn !== 'function') {
			console.error('Not a function');
		} else {
			return store(fn);
		}
	}

	exp.unregister = function(key) {
		unstore(key);
	}

	exp.setTimer = function(milliseconds){
		timer = milliseconds;
	}

	exp.clear = function(){
		clearTimeout(clear);
		queue = [];
		reserved = false;
	}


	return exp;

}());


