import { React, useState } from 'react'
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


  //To move data up a compnonet from a child component for the data in InnData.js
  const [lasts, setLasts] = useState([]);
  const last_data = (last) => { setLasts(last) }

//To move data up a compnonet from a child component for the data in Øvrigelast.js
  const [ovriges, setOvriges] = useState([]);
  const ovrige_data = (ovrige) => { setOvriges(ovrige) }

//To move data up a compnonet from a child component for the data in Vindus.js
const [vindus, setVindus] = useState([]);
const vindu_data = (vindu) => { setVindus(vindu) }  

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
            <InnData last_data={last_data} />
          </TabPanel>
          <TabPanel>
            <Vindu   vindu_data={vindu_data} />
          </TabPanel>
          <TabPanel>
            <Ovrigelast ovrige_data={ovrige_data} />
          </TabPanel>
        </Tabs>
      </div>

      
      <Oversikt lasts={lasts} ovrige={ovriges} vindus={vindus}/>
      
    </div>
  )

}
