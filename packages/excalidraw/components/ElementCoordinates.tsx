import { pointFrom, pointRotateRads, round } from "@excalidraw/math";
import clsx from "clsx";

import { getFlipAdjustedCropPosition } from "@excalidraw/element";
import { getCommonBounds } from "@excalidraw/element";
import { isImageElement } from "@excalidraw/element";

import type { ExcalidrawElement } from "@excalidraw/element/types";

import type { AppState } from "../types";

import "./ElementCoordinates.scss";

export type ElementCoordinatesProps = {
  /** Scene coordinates for the selection (top-left of AABB for multiple elements). */
  elements: readonly ExcalidrawElement[];
  appState: AppState;
  className?: string;
  /** `labeled` shows X/Y pairs; `inline` is compact `x, y`. */
  variant?: "labeled" | "inline";
};

/**
 * Returns top-left coordinates for display, aligned with the Stats panel
 * position inputs (rotation and image crop handling).
 */
export const getElementCoordinatesForDisplay = (
  element: ExcalidrawElement,
  appState: AppState,
): { x: number; y: number } => {
  const [topLeftX, topLeftY] = pointRotateRads(
    pointFrom(element.x, element.y),
    pointFrom(element.x + element.width / 2, element.y + element.height / 2),
    element.angle,
  );
  let x = round(topLeftX, 2);
  let y = round(topLeftY, 2);

  if (
    appState.croppingElementId === element.id &&
    isImageElement(element) &&
    element.crop
  ) {
    const flipAdjustedPosition = getFlipAdjustedCropPosition(element);
    if (flipAdjustedPosition) {
      x = round(flipAdjustedPosition.x, 2);
      y = round(flipAdjustedPosition.y, 2);
    }
  }

  return { x, y };
};

export const getSelectionCoordinatesForDisplay = (
  elements: readonly ExcalidrawElement[],
  appState: AppState,
): { x: number; y: number } => {
  if (elements.length === 0) {
    return { x: 0, y: 0 };
  }
  if (elements.length === 1) {
    return getElementCoordinatesForDisplay(elements[0], appState);
  }
  const [x1, y1] = getCommonBounds(elements);
  return { x: round(x1, 2), y: round(y1, 2) };
};

export const ElementCoordinates = ({
  elements,
  appState,
  className,
  variant = "labeled",
}: ElementCoordinatesProps) => {
  const { x, y } = getSelectionCoordinatesForDisplay(elements, appState);

  if (variant === "inline") {
    return (
      <span
        className={clsx(
          "element-coordinates",
          "element-coordinates--inline",
          className,
        )}
      >
        {x}, {y}
      </span>
    );
  }

  return (
    <div
      className={clsx("element-coordinates", className)}
      role="group"
      aria-label="Element coordinates"
    >
      <span className="element-coordinates__pair">
        <span className="element-coordinates__label">X</span>
        <span className="element-coordinates__value">{x}</span>
      </span>
      <span className="element-coordinates__pair">
        <span className="element-coordinates__label">Y</span>
        <span className="element-coordinates__value">{y}</span>
      </span>
    </div>
  );
};
