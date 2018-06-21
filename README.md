# Typescript Event Emitter class
Lightweight Event Emitter class written in typescript that works on both client and server with no dependencies

## Usage
The event emitter can be used with both vanilla js and typescript

Typescript Example

```typescript
import {EventEmitter} from 'event-emitter';

class Clock extends EventEmitter {
    constructor() {
        super();
        (<any>window).setInterval(this.tickTock, 1000);
    }

    private tickTock(): void {
        this.emit('onTick', new Date())
    }
}

let clock = new Clock();

// subscribe to the onTick Event
clock.on('onTick', (theDate) => {
    console.log(`The time is ${theDate}`);
    this.count++;
    if (this.count > 10) {
        // unsubscribe after 10 seconds
        clock.off('onTick');
        console.log('Clock stopped after 10 seconds');
    }
});

```


Vanilla JS Example
```typescript

```

## Methods

### on
Fires a callback when an event is emitted that matches the key

**Function Signature**
```javascript
on(key, callback)
````

**Example**
```javascript
on('something-happened', (data)=>{
    // event fired 
    // do something with the data
})
````
### once
Fires a callback one time when an event is emitted that matches the key. After the event is is fired the callback is removed and will not fire again

**Function Signature**
```javascript
once(key, callback)
````

**Example**
```javascript
once('something-happened', (data)=>{
    // event fired 
    // do something with the data, it won't be fired again
})
````

### many
Fires a callback a specific number of times time when an event is emitted that matches the key. After the event is is fired  the callback is removed and will not fire again

**Function Signature**
```javascript
once(key, callback, count)
````

**Example**
```javascript
once('something-happened', (data)=>{
    // This event will fire 7 times and then be removed
}, 7)
````

### emit
Sends an event to any callback listening to the key 

**Function Signature**
```javascript
emit(key, data)
````

**Example**
```javascript
emit('something-happened', 'Hello');
emit('something-else', {someObject:true});
````

### off
Removes a specific callback associated with the key 

**Function Signature**
```javascript
off(key, callback)
````

**Example**
```javascript
off('something-happened', (data)=>{})
````

### offAll
Removes all callbacks attached to the event emitter

**Function Signature**
```javascript
offAll()
````

**Example**
```javascript
offAll()
````

### offKey

Removes a callback associated with the key 

**Function Signature**
```javascript
offKey(key)
````

**Example**
```javascript
off('something-happened')
````
