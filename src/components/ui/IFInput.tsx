export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

export const IFInput = ({ ...props }: Props) => {
  return (
    <input
      className="rounded-lg border border-slate-300 p-2 text-sm font-semibold leading-small focus:ring-0"
      type="text"
      {...props}
    />
  );
};
