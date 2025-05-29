import EditUser from './EditUser'
import DeleteUser from './DeleteUser'
import CreateUser from './CreateUser'
import { TabView, TabPanel } from 'primereact/tabview';

const OptionTab = () => {
  return (
    <TabView>
      <TabPanel header="Create">
        <div className="m-0">
          <CreateUser />
        </div>
      </TabPanel>
      <TabPanel header="Edit">
        <div className="m-0">
          <EditUser />
        </div>
      </TabPanel>
      <TabPanel header="Delete">
        <div className="m-0">
          <DeleteUser />
        </div>
      </TabPanel>
    </TabView>
    // <>
    //   <div className={styles.tab}>
    //     <TabButton label="Create" name="Create" activeName={activeTab} onClick={openTab} />
    //     <TabButton label="Edit" name="Edit" activeName={activeTab} onClick={openTab} />
    //     <TabButton label="Delete" name="Delete" activeName={activeTab} onClick={openTab} />
    //   </div>

    //   <TabContent name="Create" activeName={activeTab}>
    //     <CreateUser />
    //   </TabContent>

    //   <TabContent name="Edit" activeName={activeTab}>
    //     <EditUser />
    //   </TabContent>

    //   <TabContent name="Delete" activeName={activeTab}>
    //     <DeleteUser />
    //   </TabContent>
    // </>
  )
}

export default OptionTab;