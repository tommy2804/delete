interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ icon, ...otherProps }) => (
  <button {...otherProps} className="button is-primary is-small">
    <span className="icon">
      <i className={`fas ${icon}`}></i>
    </span>
  </button>
);

export default CustomButton;
