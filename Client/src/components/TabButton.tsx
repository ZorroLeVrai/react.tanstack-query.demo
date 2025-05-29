import styles from './TabButton.module.css';

interface TabButtonProps {
  label: string; 
  name: string;
  activeName: string;
  onClick: (name: string) => void;
};

const TabButton = ({label, name, activeName, onClick} : TabButtonProps) => {
  const isActive = name === activeName;
  const buttonStyles = [styles.default]; // Default class for all buttons
  if (isActive) {
    buttonStyles.push(styles.active); // Add active class if this button is the active one
  }

  return (
    <button className={buttonStyles.join(" ")} onClick={() => onClick(name)}>
      {label}
    </button>
  )
}

export default TabButton;