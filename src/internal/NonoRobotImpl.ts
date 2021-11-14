/*
 * This file is part of Interacto.
 * Interacto is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * Interacto is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with Interacto.  If not, see <https://www.gnu.org/licenses/>.
 */
import type {NonoRobot} from "../api/NonoRobot";
import type {EventTargetInit} from "../api/EventTargetInit";

export class NonoRobotImpl implements NonoRobot {
    private currentTarget: EventTarget | undefined;

    public constructor(target?: EventTarget) {
        this.currentTarget = target;
    }

    private checkEventTarget(target?: EventTarget | EventTargetInit): EventTarget {
        let evtTarget: EventTarget | undefined;

        if (target instanceof EventTarget) {
            evtTarget = target;
        } else {
            if (target?.target !== undefined) {
                evtTarget = target.target;
            }
        }

        if (this.currentTarget === undefined && evtTarget === undefined) {
            throw new Error("You must specify the event target");
        }
        if (evtTarget !== undefined) {
            this.currentTarget = evtTarget;
        }

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return this.currentTarget!;
    }

    private fixingParameters<T extends EventInit>(params: EventTarget | T): T {
        const parameters: T = params instanceof EventTarget ? {} as T : {...params};
        // Requires for bubbling
        parameters.bubbles ??= true;
        return parameters;

    }

    private processMouseEvent(type: "auxclick" | "click" | "dblclick" | "mousedown" | "mouseenter" | "mouseleave" |
    "mousemove" | "mouseout" | "mouseover" | "mouseup",
                              params?: EventTarget | (EventTargetInit & MouseEventInit)): this {
        this.checkEventTarget(params).dispatchEvent(new MouseEvent(type, this.fixingParameters(params ?? {})));
        return this;
    }

    private processWheelEvent(type: "wheel",
                              params?: EventTarget | (EventTargetInit & WheelEventInit)): this {
        this.checkEventTarget(params).dispatchEvent(new WheelEvent(type, this.fixingParameters(params ?? {})));
        return this;
    }

    private processKeyEvent(type: "keydown" | "keyup", params?: EventTarget | (EventTargetInit & MouseEventInit)): this {
        this.checkEventTarget(params).dispatchEvent(new KeyboardEvent(type, this.fixingParameters(params ?? {})));
        return this;
    }

    private processTouchEvent(type: "touchend" | "touchmove" | "touchstart",
                              params?: EventTarget | (EventTargetInit & TouchEventInit), touchInits?: Array<TouchInit>,
                              timestamp?: number): this {
        const paramsToUse = this.fixingParameters(params ?? {});
        if (touchInits !== undefined && touchInits.length > 0) {
            // eslint-disable-next-line complexity
            const touches: Array<Touch> = touchInits.map(init => ({
                "altitudeAngle": init.altitudeAngle ?? 0,
                "azimuthAngle": init.azimuthAngle ?? 0,
                "identifier": init.identifier,
                "screenX": init.screenX ?? 0,
                "screenY": init.screenY ?? 0,
                "clientX": init.clientX ?? 0,
                "clientY": init.clientY ?? 0,
                "force": init.force ?? 0,
                "pageX": init.pageX ?? 0,
                "pageY": init.pageY ?? 0,
                "radiusX": init.radiusX ?? 0,
                "radiusY": init.radiusY ?? 0,
                "rotationAngle": init.rotationAngle ?? 0,
                "target": this.checkEventTarget(params),
                "touchType": init.touchType ?? "direct"
            } as Touch));
            if (paramsToUse.changedTouches === undefined) {
                paramsToUse.changedTouches = touches;
            } else {
                paramsToUse.changedTouches.push(...touches);
            }
        }

        const evt = new TouchEvent(type, paramsToUse);

        if (timestamp !== undefined) {
            Object.defineProperty(evt, "timeStamp", {"value": timestamp});
        }

        this.checkEventTarget(params).dispatchEvent(evt);
        return this;
    }

    public click(params?: EventTarget | (EventTargetInit & MouseEventInit), count: number = 1): this {
        for (let i = 0; i < count; i++) {
            this.processMouseEvent("click", params);
        }
        return this;
    }

    public dblclick(params?: EventTarget | (EventTargetInit & MouseEventInit)): this {
        return this.processMouseEvent("dblclick", params);
    }

    public auxclick(params?: EventTarget | (EventTargetInit & MouseEventInit), count: number = 1): this {
        for (let i = 0; i < count; i++) {
            this.processMouseEvent("auxclick", params);
        }
        return this;
    }

    public mousemove(params?: EventTarget | (EventTargetInit & MouseEventInit)): this {
        return this.processMouseEvent("mousemove", params);
    }

    public mousedown(params?: EventTarget | (EventTargetInit & MouseEventInit)): this {
        return this.processMouseEvent("mousedown", params);
    }

    public mouseup(params?: EventTarget | (EventTargetInit & MouseEventInit)): this {
        return this.processMouseEvent("mouseup", params);
    }

    public mouseover(params?: EventTarget | (EventTargetInit & MouseEventInit)): this {
        return this.processMouseEvent("mouseover", params);
    }

    public mouseout(params?: EventTarget | (EventTargetInit & MouseEventInit)): this {
        return this.processMouseEvent("mouseout", params);
    }

    public mouseenter(params?: EventTarget | (EventTargetInit & MouseEventInit)): this {
        return this.processMouseEvent("mouseenter", params);
    }

    public mouseleave(params?: EventTarget | (EventTargetInit & MouseEventInit)): this {
        return this.processMouseEvent("mouseleave", params);
    }

    public wheel(params?: EventTarget | (EventTargetInit & WheelEventInit)): this {
        return this.processWheelEvent("wheel", params);
    }

    public scroll(params?: EventTarget | (EventTargetInit & UIEventInit)): this {
        this.checkEventTarget(params).dispatchEvent(new UIEvent("scroll", this.fixingParameters(params ?? {})));
        return this;
    }

    public input(params?: EventTarget | (EventTargetInit & InputEventInit)): this {
        this.checkEventTarget(params).dispatchEvent(new InputEvent("input", this.fixingParameters(params ?? {})));
        return this;
    }

    public change(params?: EventTarget | (EventInit & EventTargetInit)): this {
        this.checkEventTarget(params).dispatchEvent(new Event("change", this.fixingParameters(params ?? {})));
        return this;
    }

    public keydown(params?: EventTarget | (EventTargetInit & KeyboardEventInit)): this {
        return this.processKeyEvent("keydown", params);
    }

    public keyup(params?: EventTarget | (EventTargetInit & KeyboardEventInit)): this {
        return this.processKeyEvent("keyup", params);
    }

    public touchstart(params?: EventTarget | (EventTargetInit & TouchEventInit), touches?: Array<TouchInit>, timestamp?: number): this {
        return this.processTouchEvent("touchstart", params, touches, timestamp);
    }

    public touchmove(params?: EventTarget | (EventTargetInit & TouchEventInit), touches?: Array<TouchInit>, timestamp?: number): this {
        return this.processTouchEvent("touchmove", params, touches, timestamp);
    }

    public touchend(params?: EventTarget | (EventTargetInit & TouchEventInit), touches?: Array<TouchInit>, timestamp?: number): this {
        return this.processTouchEvent("touchend", params, touches, timestamp);
    }

    public do(fn: () => void): this {
        fn();
        return this;
    }
}

/**
 * Factory method for getting an instance of robot Nono. New instance on each call.
 * @param target - The object to target. Optional.
 * @returns A new instance of robot Nono.
 */
export function robot(target?: EventTarget): NonoRobot {
    return new NonoRobotImpl(target);
}
