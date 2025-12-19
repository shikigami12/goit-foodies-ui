import clsx from "clsx";

export const Subtitle = ({ children, as: Component = "p", className, ...props }) => {
  return <Component className={clsx("text-[#BFBEBE] tablet:text-[#1A1A1A] tablet:desktop-tablet-main", className)} {...props}>{children}</Component>;
};
