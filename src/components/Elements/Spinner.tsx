import './Spinner.scss';

const SPINNER_SIZES = {
  small: 'spinner--sm',
  medium: 'spinner--md',
  large: 'spinner--lg',
};

type SpinnerProps = {
  size?: keyof typeof SPINNER_SIZES;
  className?: string;
};

export const Spinner = ({ size = 'medium', className = '' }: SpinnerProps) => {
  return <div className={`spinner ${SPINNER_SIZES[size]} ${className}`}></div>;
};
