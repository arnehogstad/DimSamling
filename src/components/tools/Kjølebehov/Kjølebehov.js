import {React,  useState } from 'react'
import { useSelector } from 'react-redux'
import InnData from './components/InnData'
import Vindu from "./components/Vindu"
import Ovrigelast from './components/Ovrigelast'
import "../../../styles/kjølebehov/kjølebehov.css"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Oversikt from './components/Oversikt'

export default function Kjølebehov(props) {
  const showTool = useSelector((state) => state.tool.visibleId)

  const [lasts, setLasts] = useState([]);

  const last_data = (last) => { setLasts(last) }
  
  return (
    <div className={props.toolId === showTool ? "toolArea" : "hiddenTool"}>
      <div className="toolInfo">

        <Tabs>
          <TabList>
            <Tab>Inn Data</Tab>
            <Tab>Vinduer</Tab>
            <Tab>Øvrige Last</Tab>
          </TabList>

          <TabPanel>
            <InnData last_data={last_data}/>
          </TabPanel>
          <TabPanel>
            <Vindu />
          </TabPanel>
          <TabPanel>
            <Ovrigelast last_data={last_data} />
          </TabPanel>
        </Tabs>
      </div>
      <Oversikt />
      <p>{lasts[1]}</p>
    </div>
  )

}
