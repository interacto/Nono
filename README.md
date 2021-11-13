
# ノノ

It's me ノノ small robot you know, friends of user interfaces. 



Nono (ノノ), a fluent TypeScript API for triggering UI events. Helpful for testing UIs.


# Installation

`npm install interacto-nono`

# Usage

Some examples. More to come

`import {robot} from 'interacto-nono';`


```ts
robot(div)
  .click();
```


```ts
robot()
    .click({"target": canvas, "button": 1, "screenX": 111, "screenY": 222, "clientX": 11, "clientY": 22});
```

```ts
robot(canvas)
    .mousedown({"button": 0})
    .mousemove({"button": 2})
    .mousemove({"button": 0});
```

```ts
robot(canvas)
    .click()
    .click()
    .mousemove()
    .click()
    .click();
```

```ts
robot(canvas)
    .click()
    .click()
    .keydown({"code": "27"});
```

```ts
robot(canvas)
    .click({"clientX": 11, "clientY": 23, "button": 1})
    .click({"clientX": 11, "clientY": 23, "button": 1})
    .mousemove({"clientX": 20, "clientY": 30, "button": 1})
    .click({"clientX": 20, "clientY": 30, "button": 0})
    .click({"clientX": 20, "clientY": 30, "button": 0});
```

```ts
robot(canvas)
    .mousedown()
    .mousemove()
    .keydown({"code": "Escape"})
    .mousedown()
    .mousemove();
```

```ts
robot(text)
    .keydown({"code": "a"})
    .keyup({"code": "a"});
```

```ts
robot(canvas)
    .mousedown()
    .do(() => jest.runOnlyPendingTimers());
```

```ts
robot().input(checkbox);
```

```ts
robot().change(button);
```

```ts
robot().input(colorBox);
```

```ts
robot().change(comboBox);
```

```ts
robot().input(inputdate);
```

```ts
robot(aElement).input();
```

```ts
robot(spinner).input();
```

```ts
robot(textArea).input();
```

```ts
robot(canvas).scroll();
```

```ts
robot()
    .wheel({"target": canvas, "button": 1, "screenX": 111, "screenY": 222, "clientX": 11, "clientY": 22,
    "deltaX": 18, "deltaY": 19, "deltaZ": 20, "deltaMode": 21});
```

```ts
robot(elt)
    .touchstart({}, [{"identifier": 1, "target": elt}])
    .touchmove({}, [{"identifier": 1, "target": elt}])
    .touchend({}, [{"identifier": 1, "target": elt}])
    .touchstart({}, [{"identifier": 1, "target": elt}])
    .touchmove({}, [{"identifier": 1, "target": elt}]);
```