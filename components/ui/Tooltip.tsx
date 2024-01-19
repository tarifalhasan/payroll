import { AnimatePresence, motion } from "framer-motion";
import React, { FC, ReactElement, ReactNode } from "react";
import { Arrow, useHover, useLayer } from "react-laag";

interface TooltipProps {
  children: ReactNode;
  text: ReactNode;
}

const BG_COLOR = "#000"; // Adjust as needed
const BORDER_COLOR = "#000000"; // Adjust as needed

export const Tooltip: FC<TooltipProps> = ({ children, text }) => {
  const [isOver, hoverProps] = useHover({ delayEnter: 100, delayLeave: 300 });

  const { triggerProps, layerProps, arrowProps, renderLayer } = useLayer({
    isOpen: isOver,
    placement: "top-center",
    triggerOffset: 8,
  });

  let trigger: ReactNode;
  if (isReactText(children)) {
    trigger = (
      <span className="tooltip-text-wrapper" {...triggerProps} {...hoverProps}>
        {children}
      </span>
    );
  } else {
    trigger = React.cloneElement(children as ReactElement, {
      ...triggerProps,
      ...hoverProps,
    });
  }

  return (
    <>
      {trigger}
      {renderLayer(
        <AnimatePresence>
          {isOver && (
            <motion.div
              className=" bg-gray-800 text-white px-2 rounded  font-medium py-[2px] text-sm "
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.1 }}
              {...layerProps}
            >
              {text}
              <Arrow
                {...arrowProps}
                backgroundColor={BG_COLOR}
                borderColor={BORDER_COLOR}
                borderWidth={1}
                size={6}
              />
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  );
};

function isReactText(children: ReactNode): children is string | number {
  return typeof children === "string" || typeof children === "number";
}
