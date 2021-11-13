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
    mousedown(params?: EventTarget | (EventTargetInit & MouseEventInit)): this;
    click(params?: EventTarget | (EventTargetInit & MouseEventInit), count?: number): this;
    dblclick(params?: EventTarget | (EventTargetInit & MouseEventInit)): this;
    auxclick(params?: EventTarget | (EventTargetInit & MouseEventInit), count?: number): this;
    mousemove(params?: EventTarget | (EventTargetInit & MouseEventInit)): this;
    mouseup(params?: EventTarget | (EventTargetInit & MouseEventInit)): this;
    mouseover(params?: EventTarget | (EventTargetInit & MouseEventInit)): this;
    mouseout(params?: EventTarget | (EventTargetInit & MouseEventInit)): this;
    mouseenter(params?: EventTarget | (EventTargetInit & MouseEventInit)): this;
    mouseleave(params?: EventTarget | (EventTargetInit & MouseEventInit)): this;
    input(params?: EventTarget | (EventTargetInit & InputEventInit)): this;
    change(params?: EventTarget | (EventTargetInit & InputEventInit)): this;
    keydown(params?: EventTarget | (EventTargetInit & KeyboardEventInit)): this;
    keyup(params?: EventTarget | (EventTargetInit & KeyboardEventInit)): this;
    wheel(params?: EventTarget | (EventTargetInit & WheelEventInit)): this;
    scroll(params?: EventTarget | (EventTargetInit & UIEventInit)): this;
    touchstart(params?: EventTarget | (EventTargetInit & TouchEventInit), touches?: Array<TouchInit>, timestamp?: number): this;
    touchmove(params?: EventTarget | (EventTargetInit & TouchEventInit), touches?: Array<TouchInit>, timestamp?: number): this;
    touchend(params?: EventTarget | (EventTargetInit & TouchEventInit), touches?: Array<TouchInit>, timestamp?: number): this;
    do(fn: () => void): this;
}
