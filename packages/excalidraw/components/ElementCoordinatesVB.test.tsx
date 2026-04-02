import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ElementCoordinatesVB } from "./ElementCoordinatesVB";

import type { ExcalidrawElement } from "@excalidraw/element/types";

import type { AppState } from "../types";

const baseAppState = {} as AppState;

describe("ElementCoordinatesVB", () => {
  it("uses display name ElementCoordinatesV-B", () => {
    expect(ElementCoordinatesVB.displayName).toBe("ElementCoordinatesV-B");
  });

  it("renders selection coordinates", () => {
    const el = {
      x: 10,
      y: 20,
      width: 40,
      height: 30,
      angle: 0,
    } as ExcalidrawElement;

    const { getByText } = render(
      <ElementCoordinatesVB elements={[el]} appState={baseAppState} />,
    );

    expect(getByText("10")).toBeInTheDocument();
    expect(getByText("20")).toBeInTheDocument();
  });
});
