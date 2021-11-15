
# ノノ

It's me ノノ small robot you know, friends of user interfaces. 



Nono (ノノ), a fluent TypeScript API for triggering UI events. Helpful for testing UIs.


# Installation

`npm install --save-dev interacto-nono`

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

```ts
robot(canvas)
    .auxclick({"button": 2}, 2);
```

```ts
robot()
    .click(canvas, 2)
    .mousemove()
    .keydown({"code": "27"});
```

```ts
robot(canvas)
    .keepData()
    .mousedown({"screenX": 1, "screenY": 2, "clientX": 11, "clientY": 23, "button": 0})
    .mousemove({"screenX": 3, "screenY": 4, "clientX": 15, "clientY": 25})
    .mouseup();
```

```ts
robot(text)
    .keydown({"code": "A"})
    .keepData()
    .keydown({"code": "B"})
    .keyup();
```

```ts
robot(elt)
    .keepData()
    .touchstart({}, [{"identifier": 1, "target": elt}])
    .touchmove()
    .touchend()
    .touchstart()
    .touchmove();
```

```ts
robot(c1)
    .keepData()
    .touchstart({}, [{"screenX": 3, "screenY": 20, "clientX": 150, "clientY": 200, "identifier": 3, "target": c1}])
    .touchmove({}, [{"screenX": 16, "screenY": 21, "clientX": 160, "clientY": 201}])
    .touchmove({}, [{"screenX": 20, "screenY": 25, "clientX": 200, "clientY": 205}])
    .touchend({}, [{"screenX": 65, "screenY": 25, "clientX": 200, "clientY": 205}]);
```

## Augmenting the API with own routines

You can take a look to [module augmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation).

Or you can extend the Nono robot. An example for `Jest`:

```ts
export interface JestNonoRobot {
    runOnlyPendingTimers(): this;

    runAllTimers(): this;
}

class JestNonoRobotImpl extends NonoRobotImpl implements JestNonoRobot {
    public constructor(target?: EventTarget) {
        super(target);
    }

    public runOnlyPendingTimers(): this {
        jest.runOnlyPendingTimers();
        return this;
    }

    public runAllTimers(): this {
        jest.runAllTimers();
        return this;
    }
}

export function robot(target?: EventTarget): JestNonoRobot & NonoRobot {
    return new JestNonoRobotImpl(target);
}
```

Using this robot we can now write:

```ts
robot(canvas)
    .mousedown()
    .runOnlyPendingTimers();
```
