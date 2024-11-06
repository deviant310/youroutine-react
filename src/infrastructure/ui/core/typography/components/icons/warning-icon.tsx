import { memo } from "react";

import { getUnitWithMeasure } from "../../../../helpers";
import { defaultGlyphSize, GlyphProps } from "../../helpers";

export const WarningIcon = memo<GlyphProps>(
  ({ size = defaultGlyphSize, color }) => (
    <svg
      width={getUnitWithMeasure(size)}
      height={getUnitWithMeasure(size)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22 11.9998C22 17.5227 17.5228 21.9998 12 21.9998C6.47715 21.9998 2 17.5227 2 11.9998C2 6.477 6.47715 1.99985 12 1.99985C17.5228 1.99985 22 6.477 22 11.9998ZM12 7.20004C11.4477 7.20004 11 7.64776 11 8.20004V12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12V8.20004C13 7.64776 12.5523 7.20004 12 7.20004ZM13 15.9998C13 15.4476 12.5523 14.9998 12 14.9998C11.4477 14.9998 11 15.4476 11 15.9998C11 16.5521 11.4477 16.9998 12 16.9998C12.5523 16.9998 13 16.5521 13 15.9998Z"
        fill={color}
      />
    </svg>
  ),
);

WarningIcon.displayName = "WarningIcon";
