import React from "react";
import { Grid ,Button} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { Link } from 'react-router-dom';
// components
import PageTitle from "../../components/PageTitle";
import { Add } from "@material-ui/icons";



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
const baseURL1 = "http://127.0.0.1:8000/local";
export default function Locals(props) {
  const classes = useStyles();
  const [locals, setLocals] = React.useState([]);
  const [selected, setSelected] = React.useState([]);

  const fetchData = async () => {
    await axios.get(baseURL).then((response)=>{
      setLocals(response.data);
      console.log(response.data)
    })
  }
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
   props.history.push({
   pathname: "/app/updateLocal",
   state: { local: {id:rowData[0] ,
  nom:rowData[1],
   description: rowData[2],
   adresse: rowData[3],
   prix : rowData[4],
   capacite:"cap1",
   type:rowData[5]
  }}
  })
}
  
  const deleteItem=async (uId)=>{
    axios
  .delete(baseURL1+'/'+uId)
  .then(() => {
    fetchData()
    
  });
}

  const onRowSelectionChange = (curRowSelected, allRowsSelected) => {
    console.log("All Selected: ", allRowsSelected);
    let ids=[];
    allRowsSelected.map((item)=>{
      ids.push(locals[item.index].id)
    })
    setSelected(ids)
  }
  const onRowsDelete= (rowsDeleted, newData) => {
    console.log('rowsDeleted');
    console.log(selected);
    selected.forEach((item,index)=>{
      deleteItem(item)
    })
    console.log(locals[rowsDeleted.data[0].index].id)
  }
  const options = {
		filterType: 'checkbox',
		onRowClick: onRowClick,
    enableNestedDataAccess: '.',
		onRowSelectionChange: onRowSelectionChange,
    onRowsDelete:onRowsDelete
    
	};
 
  return (
    <>
      <PageTitle title="Liste des locaux" button={<Link to="/app/addLocal"><Button
      variant="contained"
      size="medium"
      color="secondary"
    ><Add></Add></Button></Link>}/>
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
