import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const CustomButton = forwardRef<HTMLButtonElement, ButtonProps>(({ className, children, disabled, ...props }, ref) => {
  return (
    <button
      className={cn('w-auto rounded-full bg-black border-transparent px-5 py-3 disabled:cursor-not-allowed disabled:opacity-50 font-semibold hover:opacity-75 transition', className)}
      disabled={disabled}
      ref={ref}
      {...props}>
      {children}
    </button>
  );
});

CustomButton.displayName = 'Button';

export default CustomButton;
