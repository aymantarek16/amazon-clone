'use client';

import * as Tooltip from '@radix-ui/react-tooltip';
import { ReactNode } from 'react';

type TooltipTextProps = {
  text: string; 
  children: ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left'; 
  align?: 'start' | 'center' | 'end'; 
  className?: string; 
};

export function TooltipText({
  text,
  children,
  side = 'top',
  align = 'center',
  className,
}: TooltipTextProps) {
  return (
    <Tooltip.Provider delayDuration={100}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>

        <Tooltip.Portal>
          <Tooltip.Content
            side={side}
            align={align}
            sideOffset={6}
            className={`z-50 max-w-xs rounded-md bg-gray-800 px-3 py-2 text-sm text-white shadow-md ${className || ''}`}
          >
            {text}
            <Tooltip.Arrow className="fill-gray-800" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
