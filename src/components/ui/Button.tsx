import clsx from 'clsx';

interface ButtonProps {
  variant: 'primary' | 'ghost' | 'outline';
  size: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  href?: string;
  className?: string;
}

const variants = {
  primary: 'bg-sky text-void font-medium hover:opacity-90',
  ghost: 'text-mist hover:text-cloud underline underline-offset-4',
  outline: 'border border-cloud/20 text-cloud hover:bg-cloud hover:text-void',
};

const sizes = {
  sm: 'text-sm px-4 py-2',
  md: 'text-base px-6 py-3',
  lg: 'text-lg px-8 py-4',
};

export default function Button({ variant, size, children, href, className }: ButtonProps) {
  const classes = clsx('inline-block font-sans tracking-wide transition', variants[variant], sizes[size], className);
  if (href) return <a href={href} className={classes}>{children}</a>;
  return <button className={classes}>{children}</button>;
}
