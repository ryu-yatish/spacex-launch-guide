import React from 'react';
import MaterialTable from 'material-table';

class Records extends React.Component {
    constructor(props) {
      super(props);
      this.tableRef = React.createRef();
    }
    state = {
      loading:false,
      stats: [],
    }
  
    componentDidMount() {
      this.setState({ loading: true })
      fetch('https://api.spaceXdata.com/v3/launches?limit=100') //data source
          .then(response => response.json())
          .then(res => {
              this.setState({ stats: res, loading: false }, () => console.log(res))
          })
          .catch(error => {
              console.log(error)
          })
  }

  render() {
    return (
      <React.Fragment>
        <MaterialTable style={{marginLeft:'10px', marginRight:'10px'}}
          title="Spacex Launch Records"
          columns={[
            { title: 'Flight number', field: 'flight_number'},
            { title: 'Mission name', field: 'mission_name'},
            { title: 'Mission ID', field: 'mission_id'},
            { title: 'Launch year', field: 'launch_year'},
            
          ]}
          data={this.state.stats}
          actions={[
            {
              icon: 'refresh',
              tooltip: 'Refresh',
              isFreeAction: true,
              onClick: () => this.tableRef.current && this.tableRef.current.onQueryChange(),
            }, 
          ]}
          options={{
            
            headerStyle: {
              backgroundColor: '#3f51b5',
              color: '#FFFF'
            }}
          }
          
        />
        <br/><br/><br/>
      </React.Fragment>
    )
  }
}
export default Records;