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

export interface NonoRobot {
    /**
     * A mousedown DOM UI event.
     * @param params - The targeted DOM objects or an EventTargetInit object or an mouse event data object
     * @returns the robot (itself)
     */
    mousedown(params?: EventTarget | (EventTargetInit & MouseEventInit)): this;

    /**
     * A mouseclick DOM UI event.
     * @param params - The targeted DOM objects or an EventTargetInit object or an mouse event data object
     * @param count - The number of clicks to perform (one click if not specified)
     * @returns the robot (itself)
     */
    click(params?: EventTarget | (EventTargetInit & MouseEventInit), count?: number): this;

    /**
     * A dblclick DOM UI event.
     * @param params - The targeted DOM objects or an EventTargetInit object or an mouse event data object
     * @returns the robot (itself)
     */
    dblclick(params?: EventTarget | (EventTargetInit & MouseEventInit)): this;

    /**
     * An auxclick DOM UI event.
     * @param params - The targeted DOM objects or an EventTargetInit object or an mouse event data object
     * @param count - The number of clicks to perform (one click if not specified)
     * @returns the robot (itself)
     */
    auxclick(params?: EventTarget | (EventTargetInit & MouseEventInit), count?: number): this;

    /**
     * A mousemove DOM UI event.
     * @param params - The targeted DOM objects or an EventTargetInit object or an mouse event data object
     * @returns the robot (itself)
     */
    mousemove(params?: EventTarget | (EventTargetInit & MouseEventInit)): this;

    /**
     * A mouseup DOM UI event.
     * @param params - The targeted DOM objects or an EventTargetInit object or an mouse event data object
     * @returns the robot (itself)
     */
    mouseup(params?: EventTarget | (EventTargetInit & MouseEventInit)): this;

    /**
     * A mouseover DOM UI event.
     * @param params - The targeted DOM objects or an EventTargetInit object or an mouse event data object
     * @returns the robot (itself)
     */
    mouseover(params?: EventTarget | (EventTargetInit & MouseEventInit)): this;

    /**
     * A mouseout DOM UI event.
     * @param params - The targeted DOM objects or an EventTargetInit object or an mouse event data object
     * @returns the robot (itself)
     */
    mouseout(params?: EventTarget | (EventTargetInit & MouseEventInit)): this;

    /**
     * A mouseenter DOM UI event.
     * @param params - The targeted DOM objects or an EventTargetInit object or an mouse event data object
     * @returns the robot (itself)
     */
    mouseenter(params?: EventTarget | (EventTargetInit & MouseEventInit)): this;

    /**
     * A mouseleave DOM UI event.
     * @param params - The targeted DOM objects or an EventTargetInit object or an mouse event data object
     * @returns the robot (itself)
     */
    mouseleave(params?: EventTarget | (EventTargetInit & MouseEventInit)): this;

    /**
     * A DOM UI input event.
     * @param params - The targeted DOM objects or an EventTargetInit object or an input event data object
     * @returns the robot (itself)
     */
    input(params?: EventTarget | (EventTargetInit & InputEventInit)): this;

    /**
     * A DOM change event.
     * @param params - The targeted DOM objects or an EventTargetInit object or an event data object
     * @returns the robot (itself)
     */
    change(params?: EventTarget | (EventInit & EventTargetInit)): this;

    /**
     * A keydown DOM keyboard event.
     * @param params - The targeted DOM objects or an EventTargetInit object or a keyboard data object
     * @returns the robot (itself)
     */
    keydown(params?: EventTarget | (EventTargetInit & KeyboardEventInit)): this;

    /**
     * A keyup DOM keyboard event.
     * @param params - The targeted DOM objects or an EventTargetInit object or a keyboard data object
     * @returns the robot (itself)
     */
    keyup(params?: EventTarget | (EventTargetInit & KeyboardEventInit)): this;

    /**
     * A DOM wheel event.
     * @param params - The targeted DOM objects or an EventTargetInit object or a wheel data object
     * @returns the robot (itself)
     */
    wheel(params?: EventTarget | (EventTargetInit & WheelEventInit)): this;

    /**
     * A scroll DOM UI event.
     * @param params - The targeted DOM objects or an EventTargetInit object or a UI event data object
     * @returns the robot (itself)
     */
    scroll(params?: EventTarget | (EventTargetInit & UIEventInit)): this;

    /**
     * A touchstart DOM touch event.
     * @param params - The targeted DOM objects or an EventTargetInit object or a touch data object
     * @param touches - The touches data to use
     * @param timestamp - The timestamp to use for this event
     * @returns the robot (itself)
     */
    touchstart(params?: EventTarget | (EventTargetInit & TouchEventInit), touches?: Array<TouchInit>, timestamp?: number): this;

    /**
     * A touchmove DOM touch event.
     * @param params - The targeted DOM objects or an EventTargetInit object or a touch data object
     * @param touches - The touches data to use
     * @param timestamp - The timestamp to use for this event
     * @returns the robot (itself)
     */
    touchmove(params?: EventTarget | (EventTargetInit & TouchEventInit), touches?: Array<TouchInit>, timestamp?: number): this;

    /**
     * A touchend DOM touch event.
     * @param params - The targeted DOM objects or an EventTargetInit object or a touch data object
     * @param touches - The touches data to use
     * @param timestamp - The timestamp to use for this event
     * @returns the robot (itself)
     */
    touchend(params?: EventTarget | (EventTargetInit & TouchEventInit), touches?: Array<TouchInit>, timestamp?: number): this;

    /**
     * A free routine that executes the provided function. Useful to execute something while not stopping the
     * function chaining.
     * @param fn - The function to be called.
     * @returns the robot (itself)
     */
    do(fn: () => void): this;
}
