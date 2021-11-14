import type {NonoRobot} from "../../src/nono";
import {NonoRobotImpl} from "../../src/nono";

let robot: NonoRobot;
let div: EventTarget;
let div2: EventTarget;

describe("robot with default event target", () => {
    beforeEach(() => {
        div = document.createElement("div");
        div2 = document.createElement("div");
        robot = new NonoRobotImpl(div);
    });

    describe("with mouse events", () => {
        let handler: (_: MouseEvent) => void;
        let handler2: (_: MouseEvent) => void;

        beforeEach(() => {
            handler = jest.fn();
            handler2 = jest.fn();
            div.addEventListener("click", handler);
            div2.addEventListener("click", handler2);
        });

        test("single click works", () => {
            robot.click({"button": 2});

            expect(handler).toHaveBeenCalledTimes(1);
            expect(handler).toHaveBeenNthCalledWith(1, expect.objectContaining({
                "button": 2
            }));
        });

        test("two clicks works", () => {
            robot
                .click({"button": 2})
                .click({"button": 1});

            expect(handler).toHaveBeenCalledTimes(2);
            expect(handler).toHaveBeenNthCalledWith(1, expect.objectContaining({
                "button": 2
            }));
            expect(handler).toHaveBeenNthCalledWith(2, expect.objectContaining({
                "button": 1
            }));
        });

        test("two clicks works with flush and clear data", () => {
            robot
                .keepData()
                .click({"button": 2})
                .flushData()
                .click();

            expect(handler).toHaveBeenCalledTimes(2);
            expect(handler).toHaveBeenNthCalledWith(1, expect.objectContaining({
                "button": 2
            }));
            expect(handler).toHaveBeenNthCalledWith(2, expect.objectContaining({
                "button": 0
            }));
        });

        test("keeps mouse button data", () => {
            robot
                .keepData()
                .click({"button": 1})
                .click();

            expect(handler).toHaveBeenCalledTimes(2);
            expect(handler).toHaveBeenNthCalledWith(1, expect.objectContaining({
                "button": 1
            }));
            expect(handler).toHaveBeenNthCalledWith(2, expect.objectContaining({
                "button": 1
            }));
        });

        test("keeps and replaces mouse button data", () => {
            robot
                .keepData()
                .click({"button": 1})
                .click({"button": 2});

            expect(handler).toHaveBeenCalledTimes(2);
            expect(handler).toHaveBeenNthCalledWith(1, expect.objectContaining({
                "button": 1
            }));
            expect(handler).toHaveBeenNthCalledWith(2, expect.objectContaining({
                "button": 2
            }));
        });

        test("keeps and merges mouse button data", () => {
            robot
                .keepData()
                .click({"button": 1, "clientY": 22})
                .click({"button": 2, "clientX": 11});

            expect(handler).toHaveBeenCalledTimes(2);
            expect(handler).toHaveBeenNthCalledWith(1, expect.objectContaining({
                "button": 1,
                "clientY": 22
            }));
            expect(handler).toHaveBeenNthCalledWith(2, expect.objectContaining({
                "button": 2,
                "clientX": 11,
                "clientY": 22
            }));
        });

        test("keeps and merges but flushes mouse button data", () => {
            robot
                .keepData()
                .click({"button": 1, "clientY": 22})
                .flushData()
                .click({"button": 2, "clientX": 11});

            expect(handler).toHaveBeenCalledTimes(2);
            expect(handler).toHaveBeenNthCalledWith(1, expect.objectContaining({
                "button": 1,
                "clientY": 22
            }));
            expect(handler).toHaveBeenNthCalledWith(2, expect.objectContaining({
                "button": 2,
                "clientX": 11
            }));
        });

        test("robot works with different HTML element and no default element", () => {
            new NonoRobotImpl()
                .click({"button": 1, "target": div2})
                .click({"button": 2, "target": div});

            expect(handler).toHaveBeenCalledTimes(1);
            expect(handler2).toHaveBeenCalledTimes(1);
            expect(handler2).toHaveBeenNthCalledWith(1, expect.objectContaining({
                "button": 1
            }));
            expect(handler).toHaveBeenNthCalledWith(1, expect.objectContaining({
                "button": 2
            }));
        });

        test("robot works with different HTML element and default element", () => {
            robot
                .click({"button": 1, "target": div2})
                .click({"button": 2, "target": div});

            expect(handler).toHaveBeenCalledTimes(1);
            expect(handler2).toHaveBeenCalledTimes(1);
            expect(handler2).toHaveBeenNthCalledWith(1, expect.objectContaining({
                "button": 1
            }));
            expect(handler).toHaveBeenNthCalledWith(1, expect.objectContaining({
                "button": 2
            }));
        });

        test("robot works with different HTML element and keeping data", () => {
            robot
                .keepData()
                .click({"button": 1, "target": div2})
                .click({"button": 2, "target": div});

            expect(handler).toHaveBeenCalledTimes(1);
            expect(handler2).toHaveBeenCalledTimes(1);
            expect(handler2).toHaveBeenNthCalledWith(1, expect.objectContaining({
                "button": 1
            }));
            expect(handler).toHaveBeenNthCalledWith(1, expect.objectContaining({
                "button": 2
            }));
        });
    });
});


