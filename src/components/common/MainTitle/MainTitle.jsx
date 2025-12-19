import clsx from "clsx";

export const MainTitle = ({ children, as: Component = "h1", className, ...props }) => {
  return <Component className={clsx("h2-mobile", className)} {...props}>{children}</Component>;
};
