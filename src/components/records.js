import React from 'react';
import MaterialTable from 'material-table';
import { useState, useEffect } from 'react';
import axios from 'axios'
import { Card } from "react-bootstrap"
import Checkbox from '@material-ui/core/Checkbox';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { Check } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';


const Records = () => {
  const [query, setQuery] = useState('https://api.spaceXdata.com/v3/launches?limit=100')
  const [launch, setLaunch] = useState(false)
  const [land, setLand] = useState(false)
  const [year, setYear] = useState(0)
  const [data, setData] = useState([]);
  const [loading, setLoading] =useState(true)
  const [selectedRow, setSelectedRow] = useState(null);

  const fetchdata = (url) => {
      setLoading(true)
      fetch(url)
      .then(response => response.json())
      .then((json) => setData(json));
      setLoading(false)
  }
  useEffect(async ()=>{
    fetchdata(query)
  },[])

  
  const changeQuery=(e)=>{
    if (e.target.value=="launchc") {
      setLaunch(e.target.checked);
      console.warn(!launch)
    }
    if (e.target.value=="landc") {
      setLand(e.target.checked)
      console.warn(!land)
    }
  }
  const updateSelectedVal=(e)=>{
    console.warn(e.target.value)
    setYear(e.target.value)
  } 
  function onFilterClick(){
    setQuery('https://api.spaceXdata.com/v3/launches?limit=100')
    var url="https://api.spaceXdata.com/v3/launches?limit=100"
    
    if (launch) {
      setQuery(url+'&launch_success=true')
      
      url = url+'&launch_success=true';
    }
    if (land) {
        setQuery(url+'&land_success=true')
        
        url= url+'&land_success=true';
    }
    if(year){
      setQuery(url+"&launch_year="+year.toString())
      
      url = url +"&launch_year="+year.toString()
    }
    fetchdata(url)
    console.warn(query)
    
  }
  function jsonToSCSS(stringdata=``, data={}) {
    /* JSON.parse can throw. Always be ready for that. */
    try { data = JSON.parse(stringdata); }
    catch (e) { console.warn(e); return ``; }
  
    return Object.keys(data)
                 .map(key => `${key}: ${data[key]};`)
                 .join('\n');
  }
  
  return (
    
    <div>
      <br></br>
      {
        loading ? <div>...loading</div> :

        <div>
          <div>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
              <FormControlLabel
              value="launchc"
              control={<Checkbox color="primary" onChange={(e)=>changeQuery(e)}/>}
              label="Launch successful"
              labelPlacement="start"
              />
              <FormControlLabel
              value="landc"
              control={<Checkbox color="primary"  onChange={(e)=>changeQuery(e)} />}
              label="landing successful"
              labelPlacement="start"
              />
              <div>     </div>
              <Select value={year}
              displayEmpty
              onChange={updateSelectedVal}
              >
                <MenuItem value={0}>  year  </MenuItem>
                <MenuItem value={2005}>2005</MenuItem>
                <MenuItem value={2006}>2006</MenuItem>
                <MenuItem value={2007}>2007</MenuItem>
                <MenuItem value={2008}>2008</MenuItem>
                <MenuItem value={2009}>2009</MenuItem>
                <MenuItem value={2010}>2010</MenuItem>
                <MenuItem value={2011}>2011</MenuItem>
                <MenuItem value={2012}>2012</MenuItem>
                <MenuItem value={2013}>2013</MenuItem>
                <MenuItem value={2014}>2014</MenuItem>
                <MenuItem value={2015}>2015</MenuItem>
                <MenuItem value={2016}>2016</MenuItem>
                <MenuItem value={2017}>2017</MenuItem>
                <MenuItem value={2018}>2018</MenuItem>
                <MenuItem value={2019}>2019</MenuItem>
                <MenuItem value={2020}>2020</MenuItem>
                <MenuItem value={2021}>2021</MenuItem>
                </Select>
               
            
              </FormGroup>
            </FormControl>
             <Button variant="contained" color="primary" onClick={onFilterClick}>
              Filter
            </Button>
            </div>
            <div>
            
            <MaterialTable style={{marginLeft:'10px', marginRight:'10px'}}
              title=""
              columns={[
                { title: 'Flight number', field: 'flight_number'},
                { title: 'Mission name', field: 'mission_name' },
                { title: 'Launch year', field: 'launch_year', type :' numeric'},
                
              ]}
              data = {data}
              detailPanel={[
                {
                  tooltip: 'details',
                  render: rowData => {
                    return (
                      <div>
                        Flight number: {rowData.flight_number} <br></br> mission id: {rowData.mission_id} <br></br> 
                        Missio nname: {rowData.mission_name} <br></br> upcoming: {rowData.upcoming?'true':'false'}  <br></br> 
                        launch_year: {rowData.launch_year} <br></br> launch_date_unix: {rowData.launch_date_unix}  <br></br> 
                        launch_date_utc: {rowData.launch_date_utc} <br></br> launch_date_local: {rowData.launch_date_local}  <br></br> 
                        is_tentative: {rowData.is_tentative?'true':'false'} <br></br> tentative_max_precision: {rowData.tentative_max_precision}   <br></br>  
                        tbd: {rowData.tbd?'true':'false'} <br></br> launch_window: {rowData.launch_window}  <br></br> 
                        rocket: {JSON.stringify(rowData.rocket,null,2)} <br></br> ships: {JSON.stringify(rowData.ships,null, 2)} <br></br>  
                        telemetry: {JSON.stringify(rowData.telemetry,null,2)} <br></br> launch_site: {JSON.stringify(rowData.launch_site,null, 2)} <br></br>  
                        launch_success: {rowData.launch_success?'true':'false'} <br></br> launch_failure_details: {JSON.stringify(rowData.launch_failure_details,null, 2)}  <br></br> 
                        links: {JSON.stringify(rowData.links,null,2)} <br></br> details: {rowData.details}  <br></br> 
                        static_fire_date_utc: {rowData.static_fire_date_utc} <br></br> static_fire_date_unix: {rowData.static_fire_date_unix}  <br></br> 
                        timeline: {JSON.stringify(rowData.timeline,null,2)} <br></br> crew: {rowData.crew}  <br></br> 
                        tableData: {JSON.stringify(rowData.tableData,null,2)} <br></br><br></br> 
                      </div>
                    )
                  },
                }
              ]}
              onRowClick={(event, rowData, togglePanel) => togglePanel()}
              actions={[
                {
                  icon: 'refresh',
                  tooltip: 'Refresh',
                  isFreeAction: true,
                  onClick: () => this.tableRef.current && this.tableRef.current.onQueryChange(),
                }, 
              ]}
             
              options={{
                
               grouping: false,
               filtering: true,
               headerStyle: {
                backgroundColor: '#01579b',
                color: '#FFF'
               },
               
              }}
            />
            <br/><br/><br/>
          
            </div>
            
        </div>
        
      }
       
    </div>
  )
}

export default Records
