import React from 'react'
import styles from './OptionTab.module.css'
import TabContent from './TabContent'
import EditUser from './EditUser'
import DeleteUser from './DeleteUser'
import CreateUser from './CreateUser'
import TabButton from './TabButton'

const OptionTab = () => {
  const [activeTab, setActiveTab] = React.useState('Create');

  const openTab = (tabName: string) => {
    setActiveTab(tabName);
  }

  return (
    <>
      <div className={styles.tab}>
        <TabButton label="Create" name="Create" activeName={activeTab} onClick={openTab} />
        <TabButton label="Edit" name="Edit" activeName={activeTab} onClick={openTab} />
        <TabButton label="Delete" name="Delete" activeName={activeTab} onClick={openTab} />
      </div>

      <TabContent name="Create" activeName={activeTab}>
        <CreateUser />
      </TabContent>

      <TabContent name="Edit" activeName={activeTab}>
        <EditUser />
      </TabContent>

      <TabContent name="Delete" activeName={activeTab}>
        <DeleteUser />
      </TabContent>
    </>
  )
}

export default OptionTab;