import React from "react";
import { Grid ,Button} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
// components
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
import Table from "../dashboard/components/Table/Table";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from '@material-ui/icons/Add';

// data
import mock from "../dashboard/mock";
import { Add } from "@material-ui/icons";

const datatableData = [
  {id:1,  firstname: "Gabby George", lastName: "Business Analyst", email: "Minneapolis", phoneNumber: 30, numAdesion: "$100,000"},
  {id:2,  firstname: "Aiden Lloyd", lastName: "Business Consultant", email: "Dallas",  phoneNumber: 55, numAdesion: "$200,000" },
  {id:3,  firstname: "Jaden Collins", lastName: "Attorney", email: "Santa Ana", phoneNumber: 27, numAdesion: "$500,000"},
  {id:4,  firstname: "Franky Rees", lastName: "Business Analyst", email: "St. Petersburg", phoneNumber: 22, numAdesion: "$50,000"}
  
];
const columns = [
  {
    label: "Id",
    name: "id",
    
  },
  {
    
    label: "Prenom",
    name: "firstName",
    
  },
  {
    label: "Nom",
    name: "lastName",
    
  },
  {
    label: "Email",
    name: "email",
    
  },
  {
    label: "N° Telephone",
    name: "phoneNumber",
    
  },
  {
    label: "N° d'adhésion",
    name: "numAdesion",
    
  }
]
const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  }
}))
const baseURL = "http://127.0.0.1:8000/users/";
const baseURL1 = "http://127.0.0.1:8000/user";
export default function Tables(props) {
  const classes = useStyles();
  const [users, setUsers] = React.useState([]);
  const [empty, setEmpty] = React.useState(true);
  const [selected, setSelected] = React.useState([]);

React.useEffect(() => {
  const fetchData = async () => {
    await axios.get(baseURL).then((response)=>{
      setUsers(response.data);
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
     pathname: "/app/updateUser",
     state: { user: {id:rowData[0] ,
    firstName:rowData[1],
     lastName: rowData[2],
     email: rowData[3],
     phone: rowData[4],
     numAdesion : rowData[5]}}
    })
  }
  
  const onRowSelectionChange = (curRowSelected, allRowsSelected) => {
    console.log("All Selected: ", allRowsSelected);
    let ids=[];
    allRowsSelected.map((item)=>{
      ids.push(users[item.index].id)
    })
    setSelected(ids)
  }
  const onRowsDelete= (rowsDeleted, newData) => {
    console.log('rowsDeleted');
    console.log(selected);
    console.log(users[rowsDeleted.data[0].index].id)
  }
  const options = {
		filterType: 'checkbox',
		onRowClick: onRowClick,
		onRowSelectionChange: onRowSelectionChange,
    onRowsDelete:onRowsDelete
    
	};
 
  return (
    <>
      <PageTitle title="Liste des Utilisateur" button={<Link to="/app/addUser"><Button
      variant="contained"
      size="medium"
      color="secondary"
    ><Add></Add></Button></Link>} />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Liste des Utilisateur"
            data={users}
            columns={columns}
            options={options}
          />
        </Grid>
      </Grid>
    </>
  );
}
