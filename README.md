# eventFraming
EventFraming is a global event manager to trigger events within specific time range for better performance, specifically designed to improve performance in case on high-frequency event listeners, such as on *scroll*, *resize* etc...
<br/><br/>

##Usage

#####1 Include the *event-framing.min.js* file in a script tag.
```html
<script src="dist/event-framing.min.js"></script>
```

#####2 Set global timer
```javascript
eventFraming.setTimer(500) //It expects milliseconds. Default value is 200
```

#####3 Register the function you want to call inside the eventFraming cycle
```javascript
//This is the original function
function fn() {
  console.log("Function fires");
}

//Register the function you want to frame.
var framedFn = eventFraming.register(fn);
```

#####4 Bind the function to high-frequency events.
```javascript

//In this case, function will be called only every 500 milliseconds.
window.addEventListener("scroll", framedFn);
```

<br/>

##API

#### `eventFraming.setTimer(milliseconds)`

Set the global timer within which all registered functions will fire.<br/>
Default value: `200`
<br/><br/>

#### `eventFraming.register(fn)`

Register a function to eventFraming service. It returns a new function which will automatically fire within the global timer.
<br/><br/>

#### `eventFraming.unregister(fn)`

Unregister a function from eventFraming service.
<br/><br/>

#### `eventFraming.clear()`

Cancel the next eventFraming cycle.
<br/><br/>

#### Additional option
Returned function from `eventFraming.register(fn)` accepts a boolean parameter in case you want the function to fires also at the beginning of time range.<br/>
Default value: `false`
```javascript

//Register the function you want to frame.
var framedFn = eventFraming.register(fn);

//Fire the function also at the beginning of timer.
//In this case: FUNCTION FIRE ----- timer pause ------ FUNCTION FIRE AGAIN
framedFn(true);
```


## License

MIT

