import React from "react";
import { Grid ,Button} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { Link } from 'react-router-dom';
// components
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
import Table from "../dashboard/components/Table/Table";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

// data
import mock from "../dashboard/mock";


const columns = [
  {
    label: "Id",
    name: "id",
    
  },
  {
    
    label: "Nom",
    name: "nom",
    
  },
  {
    label: "Description",
    name: "description",
    
  },
  {
    label: "Adresse",
    name: "adresse",
    
  },
  {
    label: "Prix",
    name: "prix",
    
  },
  {
    label: "Type",
    name: "type.Label",
    
  }
]
const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  }
}))
const baseURL = "http://127.0.0.1:8000/locals/";
const baseURL1 = "http://127.0.0.1:8000/user";
export default function Locals() {
  const classes = useStyles();
  const [locals, setLocals] = React.useState([]);
  const [empty, setEmpty] = React.useState(true);

React.useEffect(() => {
  const fetchData = async () => {
    await axios.get(baseURL).then((response)=>{
      setLocals(response.data);
      console.log(response.data)
    })
    

}
fetchData()
 
}, []);
  
  const onRowClick = (rowData, rowMeta) => {
    console.log("----RowClick");
    console.log("rowData: ", rowData);
    console.log("rowMeta: ", rowMeta);
  }
  
  const onRowsSelect = (curRowSelected, allRowsSelected) => {
    console.log("---RowSelect")
    console.log("Row Selected: ", curRowSelected);
    console.log("All Selected: ", allRowsSelected);
  }
  const options = {
		filterType: 'checkbox',
		onRowClick: onRowClick,
		onRowsSelect: onRowsSelect,
    enableNestedDataAccess: '.',
    
	};
 
  return (
    <>
      <PageTitle title="Liste des locaux" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Liste des locaux"
            data={locals}
            columns={columns}
            options={options}
          />
        </Grid>
      </Grid>
    </>
  );
}
