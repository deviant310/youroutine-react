import { HTMLAttributes, memo, useCallback } from "react";

import { createPortal } from "react-dom";
import { styled } from "styled-components";

import { getRootElement } from "~/rack/react";

import {
  Area,
  CloseIcon,
  FlexCSS,
  Paper,
  FlexStyledProps,
  CircleCSS,
  Clickable,
  CircleStyledProps,
  ClickableElement,
} from "../core";
import { animated, TransientProps } from "../helpers";

export const Popup = memo<PopupProps>(props => {
  const { children, visible, setVisibility } = props;

  const closePopup = useCallback(() => setVisibility(false), [setVisibility]);

  return createPortal(
    <PopupContainer>
      <PopupOverlayAnimatedContainer>
        {visible && <PopupOverlayStyled onMouseDown={closePopup} />}
      </PopupOverlayAnimatedContainer>

      <PopupAnimatedContainer>
        {visible && (
          <Paper radius={4}>
            <Area position="absolute" right={3} top={3}>
              <PopupClose onClick={closePopup} />
            </Area>

            {children}
          </Paper>
        )}
      </PopupAnimatedContainer>
    </PopupContainer>,
    getRootElement(),
  );
});

const PopupContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  z-index: 2;
`;

const PopupOverlayStyled = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgb(0 0 0 / 15%);
`;

const PopupOverlayAnimatedContainer = animated(
  styled.div`
    position: relative;
  `,
  "fade",
);

const PopupAnimatedContainer = animated(
  styled.div`
    position: absolute;
  `,
  "slide",
);

const PopupClose = memo<PopupCloseProps>(props => (
  <PopupCloseStyled
    $size={9}
    $justifyContent="center"
    $alignItems="center"
    {...props}
  >
    <CloseIcon />
  </PopupCloseStyled>
));

const PopupCloseStyled = styled(Clickable)<
  TransientProps<FlexStyledProps & CircleStyledProps>
>`
  ${FlexCSS}
  ${CircleCSS}
`;

export interface PopupProps extends HTMLAttributes<HTMLDivElement> {
  visible: boolean;
  setVisibility(visible: boolean): void;
}

type PopupCloseProps = HTMLAttributes<ClickableElement>;
