import React from "react";
import { Grid ,Button} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { Dialog, DialogTitle, DialogContent, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import {
    InputLabel,
    InputAdornment,
    IconButton,
    Card,
    FormControl,
    Divider
  } from '@material-ui/core';
// components
import PageTitle from "../../components/PageTitle";



import { Add } from "@material-ui/icons";


const columns = [
  {
    label: "Id",
    name: "id",
    
  },
  {
    
    label: "Reference",
    name: "reference",
    
  },
  {
    
    label: "Nombre d'adults",
    name: "adults",
    
  },
  {
    
    label: "Nombre d'enfants",
    name: "enfants",
    
  }
  
]
const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(20)
    },
    dialogTitle: {
        paddingRight: '0px'
    },
    tableOverflow: {
        overflow: 'auto'
      }
}))


const baseURL = "http://127.0.0.1:8000/capacities/";
const baseURL1 = "http://127.0.0.1:8000/capacitie";
const baseURL2 = "http://127.0.0.1:8000/capacite";
export default function Capacites(props) {
  const classes = useStyles();
  const [capacities, setCapacities] = React.useState([]);
  const [capacite, setCapacite] = React.useState({
    adults:"",
	enfants:"",
	reference:""

  });
  const [selected, setSelected] = React.useState([]);
  const [mod, setMod] = React.useState(false);
  const [id, setId] = React.useState();
  const [openPopup, setOpenPopup] = React.useState(false);
  
  const fetchData = async () => {
    await axios.get(baseURL).then((response)=>{
      setCapacities(response.data);
      console.log(response.data)
    })
  }
React.useEffect(() => {
  const fetchData = async () => {
    await axios.get(baseURL).then((response)=>{
      setCapacities(response.data);
      console.log(response.data)
    })
    

}
fetchData()
 
}, []);
const handleChange = prop => event => {
  setCapacite({ ...capacite, [prop]: event.target.value });
};

  const onRowClick = (rowData, rowMeta) => {
    setMod(true)
    setId(rowData[0])
    console.log("----RowClick");
    console.log("rowData: ", rowData);
    console.log("rowMeta: ", rowMeta);
     setCapacite({
        adults:rowData[2],
        enfants:rowData[3],
        reference:rowData[1],
    
      })
     setOpenPopup(true)
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
      ids.push(capacities[item.index].id)
    })
    setSelected(ids)
  }
  const updateCapacite = async (e) => {
    e.preventDefault()
    await axios.put(baseURL1+'/'+id,capacite).then((response) => {
        console.log(response.data)
        setOpenPopup(false)
        fetchData()
        setCapacite({
            adults:"",
            enfants:"",
            reference:""
        
          })
      });
}
  const onRowsDelete= (rowsDeleted, newData) => {
    console.log('rowsDeleted');
    console.log(selected);
    selected.forEach((item,index)=>{
      deleteItem(item)
    })
    console.log(capacities[rowsDeleted.data[0].index].id)
  }
  const options = {
		filterType: 'checkbox',
		onRowClick: onRowClick,
		onRowSelectionChange: onRowSelectionChange,
        onRowsDelete:onRowsDelete
    
	};
    const addCapacite = async (e) => {
        e.preventDefault()
        await axios.post(baseURL2,capacite).then((response) => {
            console.log(response.data)
            setOpenPopup(false)
            fetchData()
            setCapacite({
                adults:"",
                enfants:"",
                reference:""
            
              })
          });
    }
 
  return (
    <>
      <PageTitle title="Liste des Capacites des locaux" button={<Button
      variant="contained"
      size="medium"
      onClick={()=>{setOpenPopup(true) 
        setCapacite({
            adults:"",
            enfants:"",
            reference:""
        
          })
       setMod(false)
    }}
      color="secondary"
    ><Add></Add></Button>} />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Liste des Capacites des locaux"
            data={capacities}
            columns={columns}
            options={options}
          />
        </Grid>
      </Grid>
      <Dialog open={openPopup} maxWidth="md" classes={{ paper: classes.dialogWrapper }}>
            <DialogTitle className={classes.dialogTitle}>
                <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                    {mod?"Modifier":"Ajouter"}
                    </Typography>
                    <Button
                        color="secondary"
                        onClick={()=>{setOpenPopup(false)}}>
                        <CloseIcon />
                    </Button>
                </div>
            </DialogTitle>
            <DialogContent dividers>
            <FormControl
                className={clsx(classes.margin, classes.textField)}
                variant="outlined">
                <InputLabel htmlFor="outlined-adornment-reference">
                  Reference
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-label"
                  value={capacite.reference}
                  onChange={handleChange('reference')}
                  endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        edge="end">
                            <AccountCircleOutlinedIcon />
                        </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={180}
                />
              </FormControl>
              <FormControl
                className={clsx(classes.margin, classes.textField)}
                variant="outlined">
                <InputLabel htmlFor="outlined-adornment-adults">
                  Nombres des Adults
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-label"
                  value={capacite.adults}
                  onChange={handleChange('adults')}
                  endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        edge="end">
                            <AccountCircleOutlinedIcon />
                        </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={180}
                />
              </FormControl>
              <FormControl
                className={clsx(classes.margin, classes.textField)}
                variant="outlined">
                <InputLabel htmlFor="outlined-adornment-enfants">
                Nombre des Enfants
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-label"
                  value={capacite.enfants}
                  onChange={handleChange('enfants')}
                  endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        edge="end">
                            <AccountCircleOutlinedIcon />
                        </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={180}
                />
              </FormControl>  <br /><br />
              <Button  variant="contained"
                     size="medium"
                     color="secondary" style={{marginLeft:"40%"}} onClick={mod? updateCapacite :addCapacite} >
               {mod?"Modifier Capacité":"Ajouter Capacité"}
               </Button>
            </DialogContent>
        </Dialog>
    </>
  );
}
