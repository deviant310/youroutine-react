import { ElementRef, HTMLAttributes, memo, useEffect } from "react";

import { createPortal } from "react-dom";
import { styled } from "styled-components";

import { getRootElement } from "~/react";

import {
  animated,
  Area,
  AreaCSS,
  AreaProps,
  CircleCSS,
  CircleStyledProps,
  Clickable,
  CloseIcon,
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

      <GridArea
        $justifyContent="center"
        $alignItems="center"
        $position="fixed"
        $top={0}
        $left={0}
        $width="100vw"
        $height="100vh"
        $overflow="auto"
        $disabled={!opened}
        onMouseDown={({ target, currentTarget }) =>
          target === currentTarget && onClose?.()
        }
      >
        <AreaScaled marginVertical={2.4}>
          {opened && (
            <Paper radius={1.6} elevation={1.6}>
              <Area position="relative">
                <Area position="absolute" right={1} top={1.2}>
                  {onClose && (
                    <ClickableCircleStyled $size={3.6} onClick={onClose}>
                      <CloseIcon size={2.4} />
                    </ClickableCircleStyled>
                  )}
                </Area>

                {children}
              </Area>
            </Paper>
          )}
        </AreaScaled>
      </GridArea>
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

const GridArea = styled.div<TransientProps<GridStyledProps & AreaProps>>`
  ${GridCSS}
  ${AreaCSS}
`;

const AreaScaled = animated(Area, "scale");
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
