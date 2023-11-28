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

import type {EventTargetInit} from "./EventTargetInit";

export type Direction = "bottom" | "left" | "right" | "top";

export interface NonoRobot {
    /**
     * A mousedown DOM UI event.
     * @param params - The targeted DOM objects, a css selector, or an EventTargetInit object or an mouse event data object
     * @returns the robot (itself)
     */
    mousedown(params?: EventTarget | string | (EventTargetInit & MouseEventInit)): this;

    /**
     * A mouseclick DOM UI event.
     * @param params - The targeted DOM objects, a css selector, or an EventTargetInit object or an mouse event data object
     * @param count - The number of clicks to perform (one click if not specified)
     * @returns the robot (itself)
     */
    click(params?: EventTarget | string | (EventTargetInit & MouseEventInit), count?: number): this;

    /**
     * A dblclick DOM UI event.
     * @param params - The targeted DOM objects, a css selector, or an EventTargetInit object or an mouse event data object
     * @returns the robot (itself)
     */
    dblclick(params?: EventTarget | string | (EventTargetInit & MouseEventInit)): this;

    /**
     * An auxclick DOM UI event.
     * @param params - The targeted DOM objects, a css selector, or an EventTargetInit object or an mouse event data object
     * @param count - The number of clicks to perform (one click if not specified)
     * @returns the robot (itself)
     */
    auxclick(params?: EventTarget | string | (EventTargetInit & MouseEventInit), count?: number): this;

    /**
     * A mousemove DOM UI event.
     * @param params - The targeted DOM objects, a css selector, or an EventTargetInit object or an mouse event data object
     * @returns the robot (itself)
     */
    mousemove(params?: EventTarget | string | (EventTargetInit & MouseEventInit)): this;

    /**
     * A mouseup DOM UI event.
     * @param params - The targeted DOM objects, a css selector, or an EventTargetInit object or an mouse event data object
     * @returns the robot (itself)
     */
    mouseup(params?: EventTarget | string | (EventTargetInit & MouseEventInit)): this;

    /**
     * A mouseover DOM UI event.
     * @param params - The targeted DOM objects, a css selector, or an EventTargetInit object or an mouse event data object
     * @returns the robot (itself)
     */
    mouseover(params?: EventTarget | string | (EventTargetInit & MouseEventInit)): this;

    /**
     * A mouseout DOM UI event.
     * @param params - The targeted DOM objects, a css selector, or an EventTargetInit object or an mouse event data object
     * @returns the robot (itself)
     */
    mouseout(params?: EventTarget | string | (EventTargetInit & MouseEventInit)): this;

    /**
     * A mouseenter DOM UI event.
     * @param params - The targeted DOM objects, a css selector, or an EventTargetInit object or an mouse event data object
     * @returns the robot (itself)
     */
    mouseenter(params?: EventTarget | string | (EventTargetInit & MouseEventInit)): this;

    /**
     * A mouseleave DOM UI event.
     * @param params - The targeted DOM objects, a css selector, or an EventTargetInit object or an mouse event data object
     * @returns the robot (itself)
     */
    mouseleave(params?: EventTarget | string | (EventTargetInit & MouseEventInit)): this;

    /**
     * A DOM UI input event.
     * @param params - The targeted DOM objects, a css selector, or an EventTargetInit object or an input event data object
     * @returns the robot (itself)
     */
    input(params?: EventTarget | string | (EventTargetInit & InputEventInit)): this;

    /**
     * A DOM change event.
     * @param params - The targeted DOM objects, a css selector, or an EventTargetInit object or an event data object
     * @returns the robot (itself)
     */
    change(params?: EventTarget | string | (EventInit & EventTargetInit)): this;

    /**
     * A keydown DOM keyboard event.
     * @param params - The targeted DOM objects, a css selector, or an EventTargetInit object or a keyboard data object
     * @returns the robot (itself)
     */
    keydown(params?: EventTarget | string | (EventTargetInit & KeyboardEventInit)): this;

    /**
     * A keyup DOM keyboard event.
     * @param params - The targeted DOM objects, a css selector, or an EventTargetInit object or a keyboard data object
     * @returns the robot (itself)
     */
    keyup(params?: EventTarget | string | (EventTargetInit & KeyboardEventInit)): this;

    /**
     * Sends a serie of keydown+keyup events corresponding to each character of the given text.
     * Between each character (so between each keydown/keyup) a delay in ms is applied.
     * @param txt - The text to write.
     * @param delayms - The delay in ms to apply between each character of the text.
     */
    write(txt: string, delayms?: number): this;

    /**
     * A DOM wheel event.
     * @param params - The targeted DOM objects, a css selector, or an EventTargetInit object or a wheel data object
     * @returns the robot (itself)
     */
    wheel(params?: EventTarget | string | (EventTargetInit & WheelEventInit)): this;

    /**
     * A scroll DOM UI event.
     * @param params - The targeted DOM objects, a css selector, or an EventTargetInit object or a UI event data object
     * @returns the robot (itself)
     */
    scroll(params?: EventTarget | string | (EventTargetInit & UIEventInit)): this;

    /**
     * A touchstart DOM touch event.
     * @param params - The targeted DOM objects, a css selector, or an EventTargetInit object or a touch data object
     * @param touches - The touches data to use
     * @param timestamp - The timestamp to use for this event
     * @returns the robot (itself)
     */
    touchstart(params?: EventTarget | string | (EventTargetInit & TouchEventInit),
        touches?: Array<Partial<TouchInit>>, timestamp?: number): this;

    /**
     * A touchmove DOM touch event.
     * @param params - The targeted DOM objects, a css selector, or an EventTargetInit object or a touch data object
     * @param touches - The touches data to use
     * @param timestamp - The timestamp to use for this event
     * @returns the robot (itself)
     */
    touchmove(params?: EventTarget | string | (EventTargetInit & TouchEventInit),
        touches?: Array<Partial<TouchInit>>, timestamp?: number): this;

    /**
     * A touchend DOM touch event.
     * @param params - The targeted DOM objects, a css selector, or an EventTargetInit object or a touch data object
     * @param touches - The touches data to use
     * @param timestamp - The timestamp to use for this event
     * @returns the robot (itself)
     */
    touchend(params?: EventTarget | string | (EventTargetInit & TouchEventInit),
        touches?: Array<Partial<TouchInit>>, timestamp?: number): this;

    /**
     * Performs a pan (one-touch).
     * @param touchId - The touch ID
     * @param distance - The distance of the pan. In pixels.
     * @param startingPosition - The initial position of the pan.
     * @param deviation - If you do not want to perform a strictly horizontal (or vertical, etc.) pan,
     * you can use this argument to vary a little bit the other axis. 0 by default. In pixels.
     * @param moves - The number of moves to perform. 1 by default.
     * @param params - The targeted DOM objects, a css selector, or an EventTargetInit object or a touch data object
     */
    pan(touchId: number, distance: number, direction: Direction, startingPosition: Partial<TouchInit>, deviation?: number,
        moves?: number, params?: EventTarget | string | (EventTargetInit & TouchEventInit)): this;

    /**
     * Performs a pan (two touches).
     * @param id1 - The touch ID 1
     * @param id2 - The touch ID 2
     * @param distance - The distance of the pan. In pixels.
     * @param pos - The initial positions of the two touches
     * @param deviation - If you do not want to perform a strictly horizontal (or vertical, etc.) pan,
     * you can use this argument to vary a little bit the other axis. 0 by default. In pixels.
     * @param moves - The number of moves to perform. 1 by default.
     * @param params - The targeted DOM objects, a css selector, or an EventTargetInit object or a touch data object
     */
    twoPan(id1: number, id2: number, distance: number, direction: Direction,
        deviation?: number, moves?: number, params?: EventTarget | string | (EventTargetInit & TouchEventInit),
        pos?: [p1: Partial<TouchInit>, p2: Partial<TouchInit>]): this;

    /**
     * Performs a pan (three touches).
     * @param id1 - The touch ID 1
     * @param id2 - The touch ID 2
     * @param id3 - The touch ID 3
     * @param distance - The distance of the pan. In pixels.
     * @param pos - The initial positions of the three touches
     * @param deviation - If you do not want to perform a strictly horizontal (or vertical, etc.) pan,
     * you can use this argument to vary a little bit the other axis. 0 by default. In pixels.
     * @param moves - The number of moves to perform. 1 by default.
     * @param params - The targeted DOM objects, a css selector, or an EventTargetInit object or a touch data object
     */
    threePan(id1: number, id2: number, id3: number, distance: number, direction: Direction,
        deviation?: number, moves?: number, params?: EventTarget | string | (EventTargetInit & TouchEventInit),
        pos?: [p1: Partial<TouchInit>, p2: Partial<TouchInit>, p3: Partial<TouchInit>]): this;

    /**
     * Performs a pan (four touches).
     * @param id1 - The touch ID 1
     * @param id2 - The touch ID 2
     * @param id3 - The touch ID 3
     * @param id4 - The touch ID 4
     * @param distance - The distance of the pan. In pixels.
     * @param pos - The initial positions of the four touches
     * @param deviation - If you do not want to perform a strictly horizontal (or vertical, etc.) pan,
     * you can use this argument to vary a little bit the other axis. 0 by default. In pixels.
     * @param moves - The number of moves to perform. 1 by default.
     * @param params - The targeted DOM objects, a css selector, or an EventTargetInit object or a touch data object
     */
    fourPan(id1: number, id2: number, id3: number, id4: number, distance: number, direction: Direction,
        deviation?: number, moves?: number, params?: EventTarget | string | (EventTargetInit & TouchEventInit),
        pos?: [p1: Partial<TouchInit>, p2: Partial<TouchInit>, p3: Partial<TouchInit>, p4: Partial<TouchInit>]): this;

    /**
     * A free routine that executes the provided function. Useful to execute something while not stopping the
     * function chaining.
     * @param fn - The function to be called.
     * @returns the robot (itself)
     */
    do(fn: () => void): this;

    /**
     * After this function call, event data of the same type will be reused from a first event to the next one.
     * For example: `robot().keepData().mousedown({"button": 1}).mousemove();` The event `mousemove` will
     * reuse the previous MouseEventInit object, so it will move with button 1.
     * This is useful not to repeat data.
     * If `robot().keepData().mousedown({"button": 1}).mousemove({"button": 2});`, the `mousemove` will use button 2.
     * If `robot().keepData().mousedown({"clientX": 11, "clientY": 23, "button": 1})`
     *   `.mousemove({"clientX": 20, "clientY": 25});`, then the button will be the same but the properties
     *   `clientX` and `clientY` will be replaced for `mousemove`.
     * To stop keeping data, use `flushData`.
     * The default behavior of the API is not to keep data. Note that the EventTarget is not concerned by this method:
     * the robot always keeps it through the different API routine calls, never mind `keepdata` or `flushData`.
     */
    keepData(): this;

    /**
     * Related to `keepData`. Does not reuse event data along the API routine calls. This is the default behavior
     * of the API. Does not concern the EvenTarget object.
     */
    flushData(): this;
}
