import { describe, expect, it } from "vitest";

import { getElementCoordinatesForDisplay } from "./ElementCoordinates";

import type { ExcalidrawElement } from "@excalidraw/element/types";

import type { AppState } from "../types";

const baseAppState = {} as AppState;

describe("getElementCoordinatesForDisplay", () => {
  it("returns axis-aligned top-left for angle 0", () => {
    const el = {
      x: 10,
      y: 20,
      width: 40,
      height: 30,
      angle: 0,
    } as ExcalidrawElement;

    expect(getElementCoordinatesForDisplay(el, baseAppState)).toEqual({
      x: 10,
      y: 20,
    });
  });

  it("returns rotated top-left in scene space (matches Stats position math)", () => {
    const el = {
      x: 0,
      y: 0,
      width: 100,
      height: 50,
      angle: Math.PI / 2,
    } as ExcalidrawElement;

    const { x, y } = getElementCoordinatesForDisplay(el, baseAppState);
    expect(x).toBe(75);
    expect(y).toBe(-25);
  });
});
