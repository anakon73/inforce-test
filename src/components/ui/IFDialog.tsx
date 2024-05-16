import { forwardRef } from "react";

export interface Props extends React.DialogHTMLAttributes<HTMLDialogElement> {
  children: React.ReactNode;
}

export const IFDialog = forwardRef<HTMLDialogElement, Props>(
  ({ children, ...props }, ref) => {
    return (
      <dialog {...props} ref={ref}>
        {children}
      </dialog>
    );
  }
);
