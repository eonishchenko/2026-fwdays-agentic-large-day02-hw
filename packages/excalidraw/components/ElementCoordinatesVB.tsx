import clsx from "clsx";

import type { ExcalidrawElement } from "@excalidraw/element/types";

import type { AppState } from "../types";

import { getSelectionCoordinatesForDisplay } from "./ElementCoordinates";

import "./ElementCoordinates.scss";

export type ElementCoordinatesVBProps = {
  /** Scene coordinates for the selection (top-left of AABB for multiple elements). */
  elements: readonly ExcalidrawElement[];
  appState: AppState;
  className?: string;
};

/**
 * Alternate presentation for element coordinates (variant B).
 * DevTools display name: `ElementCoordinatesV-B`.
 */
export const ElementCoordinatesVB = ({
  elements,
  appState,
  className,
}: ElementCoordinatesVBProps) => {
  const { x, y } = getSelectionCoordinatesForDisplay(elements, appState);

  return (
    <div
      className={clsx(
        "element-coordinates",
        "element-coordinates--vb",
        className,
      )}
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

ElementCoordinatesVB.displayName = "ElementCoordinatesV-B";
