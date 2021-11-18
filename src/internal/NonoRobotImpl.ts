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

interface PartialTouchEventInit extends EventModifierInit {
    changedTouches?: Array<Partial<TouchInit>>;
    targetTouches?: Array<TouchInit>;
    touches?: Array<TouchInit>;
}

export class NonoRobotImpl implements NonoRobot {
    private keepEventData: boolean;

    private currentTarget: EventTarget | undefined;

    private currentMouseData: MouseEventInit | undefined;

    private currentKeyboardData: KeyboardEventInit | undefined;

    private currentWheelData: WheelEventInit | undefined;

    private currentUIEventData: UIEventInit | undefined;

    private currentInputEventData: InputEventInit | undefined;

    private currentChangeData: EventInit | undefined;

    private currentTouchData: PartialTouchEventInit | undefined;

    private readonly ongoingtouchevents: Map<EventTarget, Map<number, Touch>>;

    public constructor(target?: EventTarget) {
        this.keepEventData = false;
        this.currentTarget = target;
        this.ongoingtouchevents = new Map<EventTarget, Map<number, Touch>>();
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
        let parameters = this.fixingParameters(params ?? {});

        if (this.keepEventData) {
            if (this.currentMouseData !== undefined) {
                parameters = {...this.currentMouseData, ...parameters};
            }
            this.currentMouseData = parameters;
        }

        this.checkEventTarget(params).dispatchEvent(new MouseEvent(type, parameters));
        return this;
    }

    private processWheelEvent(type: "wheel",
                              params?: EventTarget | (EventTargetInit & WheelEventInit)): this {
        let parameters = this.fixingParameters(params ?? {});

        if (this.keepEventData) {
            if (this.currentWheelData !== undefined) {
                parameters = {...this.currentWheelData, ...parameters};
            }
            this.currentWheelData = parameters;
        }

        this.checkEventTarget(params).dispatchEvent(new WheelEvent(type, parameters));
        return this;
    }

    private processKeyEvent(type: "keydown" | "keyup", params?: EventTarget | (EventTargetInit & MouseEventInit)): this {
        let parameters = this.fixingParameters(params ?? {});

        if (this.keepEventData) {
            if (this.currentKeyboardData !== undefined) {
                parameters = {...this.currentKeyboardData, ...parameters};
            }
            this.currentKeyboardData = parameters;
        }

        this.checkEventTarget(params).dispatchEvent(new KeyboardEvent(type, parameters));
        return this;
    }

    private processTouchEvent(type: "touchend" | "touchmove" | "touchstart",
                              params?: EventTarget | (EventTargetInit & PartialTouchEventInit), touchInits?: Array<Partial<TouchInit>>,
                              timestamp?: number): this {
        const paramsToUse = this.fixingParameters(params ?? {});

        if (touchInits !== undefined) {
            if (paramsToUse.changedTouches === undefined) {
                paramsToUse.changedTouches = touchInits;
            } else {
                paramsToUse.changedTouches.push(...touchInits);
            }
        }

        const evt = new TouchEvent(type, this.fixingTouchParameters(paramsToUse, this.checkEventTarget(params)));

        if (timestamp !== undefined) {
            Object.defineProperty(evt, "timeStamp", {"value": timestamp});
        }

        this.checkEventTarget(params).dispatchEvent(evt);
        return this;
    }


    private fixingTouchParameters(paramsToUse: EventTargetInit & PartialTouchEventInit, tgt: EventTarget): TouchEventInit {
        let params = paramsToUse;

        if (this.keepEventData) {
            if (this.currentTouchData !== undefined) {
                params = {...this.currentTouchData, ...params};

                if (this.currentTouchData.changedTouches === undefined) {
                    params.changedTouches = undefined;
                } else {
                    const max = Math.max(this.currentTouchData.changedTouches.length, params.changedTouches?.length ?? 0);
                    const touches: Array<Partial<TouchInit>> = [];

                    for (let i = 0; i < max; i++) {
                        touches.push({...this.currentTouchData.changedTouches[0], ...params.changedTouches?.[0]});
                    }

                    params.changedTouches = touches;
                }
            }
            this.currentTouchData = params;
        }

        this.creatingTouchEventInit(paramsToUse, tgt);

        return params as TouchEventInit;
    }


    private creatingTouchEventInit(params: EventTargetInit & PartialTouchEventInit, tgt: EventTarget): TouchEventInit {
        // eslint-disable-next-line complexity
        params.changedTouches = params.changedTouches?.map(init => ({
            "altitudeAngle": init.altitudeAngle ?? 0,
            "azimuthAngle": init.azimuthAngle ?? 0,
            "identifier": init.identifier ?? -1,
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
            "target": tgt,
            "touchType": init.touchType ?? "direct"
        } as Touch));

        // Updating the ongoing touches
        const eventTargetTouches = this.ongoingtouchevents.get(tgt) ?? new Map<number, Touch>();

        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        if (params.changedTouches !== undefined) {
            params.changedTouches.forEach(p => {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                eventTargetTouches.set(p.identifier!, p as Touch);
            });
            this.ongoingtouchevents.set(tgt, eventTargetTouches);
        }
        // Putting the ongoing touches in the event
        if (eventTargetTouches.size > 0) {
            params.targetTouches = [...eventTargetTouches.values()];
        }

        if (this.ongoingtouchevents.size > 0) {
            params.touches = [...this.ongoingtouchevents.values()].flatMap(t => [...t.values()]);
        }

        return params as TouchEventInit;
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
        let parameters = this.fixingParameters(params ?? {});

        if (this.keepEventData) {
            if (this.currentUIEventData !== undefined) {
                parameters = {...this.currentUIEventData, ...parameters};
            }
            this.currentUIEventData = parameters;
        }

        this.checkEventTarget(params).dispatchEvent(new UIEvent("scroll", parameters));
        return this;
    }

    public input(params?: EventTarget | (EventTargetInit & InputEventInit)): this {
        let parameters = this.fixingParameters(params ?? {});

        if (this.keepEventData) {
            if (this.currentInputEventData !== undefined) {
                parameters = {...this.currentInputEventData, ...parameters};
            }
            this.currentInputEventData = parameters;
        }

        this.checkEventTarget(params).dispatchEvent(new InputEvent("input", parameters));
        return this;
    }

    public change(params?: EventTarget | (EventInit & EventTargetInit)): this {
        let parameters = this.fixingParameters(params ?? {});

        if (this.keepEventData) {
            if (this.currentChangeData !== undefined) {
                parameters = {...this.currentChangeData, ...parameters};
            }
            this.currentChangeData = parameters;
        }

        this.checkEventTarget(params).dispatchEvent(new Event("change", parameters));
        return this;
    }

    public keydown(params?: EventTarget | (EventTargetInit & KeyboardEventInit)): this {
        return this.processKeyEvent("keydown", params);
    }

    public keyup(params?: EventTarget | (EventTargetInit & KeyboardEventInit)): this {
        return this.processKeyEvent("keyup", params);
    }

    public touchstart(params?: EventTarget | (EventTargetInit & TouchEventInit), touches?: Array<Partial<TouchInit>>, timestamp?: number): this {
        return this.processTouchEvent("touchstart", params, touches, timestamp);
    }

    public touchmove(params?: EventTarget | (EventTargetInit & TouchEventInit), touches?: Array<Partial<TouchInit>>, timestamp?: number): this {
        return this.processTouchEvent("touchmove", params, touches, timestamp);
    }

    public touchend(params?: EventTarget | (EventTargetInit & TouchEventInit), touches?: Array<Partial<TouchInit>>, timestamp?: number): this {
        return this.processTouchEvent("touchend", params, touches, timestamp);
    }

    public do(fn: () => void): this {
        fn();
        return this;
    }

    public keepData(): this {
        this.keepEventData = true;
        return this;
    }

    public flushData(): this {
        this.keepEventData = false;
        this.currentMouseData = undefined;
        this.currentInputEventData = undefined;
        this.currentKeyboardData = undefined;
        this.currentWheelData = undefined;
        this.currentUIEventData = undefined;
        this.currentChangeData = undefined;
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
