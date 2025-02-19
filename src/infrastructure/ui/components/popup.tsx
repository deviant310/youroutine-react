import { ElementRef, HTMLAttributes, memo, useEffect } from "react";

import { createPortal } from "react-dom";
import { styled } from "styled-components";

import { getRootElement } from "~/react";

import {
  animated,
  Area,
  CircleCSS,
  CircleStyledProps,
  Clickable,
  Icon,
  GridCSS,
  GridStyledProps,
  Paper,
} from "../core";
import { TransientProps } from "../helpers";

export const Popup = memo<PopupPropsWithHTMLAttributes>(props => {
  const { children, opened, onClose } = props;

  useEffect(() => {
    document.body.style.overflowY = opened ? "hidden" : "";
  }, [opened]);

  return createPortal(
    <PopupContainerStyled>
      <AreaFaded position="fixed">
        {opened && <PopupBackgroundStyled />}
      </AreaFaded>

      <GridAreaScaled
        $justifyContent="center"
        $alignItems="center"
        position="fixed"
        top={0}
        left={0}
        width="100vw"
        height="100vh"
        overflow="auto"
        paddingVertical={2.4}
        disabled={!opened}
        onMouseDown={({ target, currentTarget }) =>
          target === currentTarget && onClose?.()
        }
      >
        {opened && (
          <Paper radius={1.6} elevation={1.6}>
            <Area position="relative">
              <Area position="absolute" right={1} top={1.2}>
                {onClose && (
                  <ClickableCircleStyled $size={3.6} onClick={onClose}>
                    <Icon type="close" />
                  </ClickableCircleStyled>
                )}
              </Area>

              {children}
            </Area>
          </Paper>
        )}
      </GridAreaScaled>
    </PopupContainerStyled>,
    getRootElement(),
  );
});

const PopupContainerStyled = styled.div`
  position: relative;
  z-index: 2;
`;

const PopupBackgroundStyled = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.default[5].transparent()};
`;

const GridAreaScaled = styled(animated(Area, "scale"))<
  TransientProps<GridStyledProps>
>`
  ${GridCSS}
`;

const AreaFaded = animated(Area, "fade");

const ClickableCircleStyled = styled(Clickable).attrs({
  rippleable: true,
  hoverable: true,
})<TransientProps<CircleStyledProps>>`
  ${CircleCSS};

  display: flex;
  justify-content: center;
  align-items: center;
  transition-duration: 150ms;
  transition-property: opacity;
  background-color: ${({ theme }) => theme.colors.default[8].transparent()};
`;

export interface PopupStyledProps {
  opened: boolean;
}

export interface PopupPropsWithHTMLAttributes
  extends HTMLAttributes<PopupElement>,
    PopupStyledProps {
  onClose?(): void;
}

export type PopupElement = ElementRef<typeof PopupContainerStyled>;
