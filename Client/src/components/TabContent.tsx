import React from 'react'
import styles from './TabContent.module.css'

interface TabContentProps {
  children: React.ReactNode;
  name: string;
  activeName: string;
}

const TabContent = ({children, name, activeName}: TabContentProps) => {
  const isActive = name === activeName;
  const elementStyles = [styles.tabcontent];
  if (isActive) {
    elementStyles.push(styles.active);
  }

  return (
    <div className={elementStyles.join(' ')}>
      {children}
    </div>
  )
}

export default TabContent;