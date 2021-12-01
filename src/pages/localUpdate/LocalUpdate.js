import React, { Fragment } from 'react';

import clsx from 'clsx';
import axios from "axios";
import {
  Grid,
  InputLabel,
  InputAdornment,
  IconButton,
  Card,
  Divider,
  Button,
  FormControl
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import {useParams} from 'react-router-dom';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  margin: {
    margin: theme.spacing(3)
  },
  withoutLabel: {
    marginTop: theme.spacing(3)
  },
  textField: {
    width: "90%"
  }
}));
const baseURL = "http://127.0.0.1:8000/local";
const LocalUpdate = (props) => {
  const classes = useStyles();
  const cardStyle={
    width: "100%",
    borderRadius: "3%",
    marginLeft:"200px"
  }
  const [values, setValues] = React.useState({
    nom: props.location.state.local.nom,
    description:  props.location.state.local.description,
    adresse: props.location.state.local.adresse,
    prix: props.location.state.local.prix,
    capacite: props.location.state.local.capacite,
    type: props.location.state.local.type
  });
 const updateLocal= async (e) => {
        e.preventDefault()
        await axios.put(baseURL+'/'+props.location.state.local.id,values).then((response) => {
            console.log(response.data)
          });
    }
  const handleChange = prop => event => {
      if(prop=="prix"){
        setValues({ ...values, [prop]: parseFloat(event.target.value) });
      }else{
    setValues({ ...values, [prop]: event.target.value });
      }
    console.log(values)
  };


  const { action } = useParams();
  return (
    <Fragment>
      <Grid container spacing={4}>
        
        <Grid item xs={12} lg={6} >
          <Card className="p-4 mb-4" style={cardStyle}>
        <form>
            <Divider className="my-4" />

            <div >
               <FormControl
                className={clsx(classes.margin, classes.textField)}
                variant="outlined">
                <InputLabel htmlFor="outlined-adornment-fname">
                  Nom du local
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-fname"
                  value={values.nom}
                  onChange={handleChange('nom')}
                  endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        edge="end">
                         <AccountCircleOutlinedIcon />
                        </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
              </FormControl>
              <FormControl
                className={clsx(classes.margin, classes.textField)}
                variant="outlined">
                <InputLabel htmlFor="outlined-adornment-lname">
                Description
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-lname"
                  value={values.description}
                  onChange={handleChange('description')}
                  endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        edge="end">
                            <AccountCircleOutlinedIcon />
                        </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
              </FormControl>  
              <FormControl
                className={clsx(classes.margin, classes.textField)}
                variant="outlined">
                <InputLabel htmlFor="outlined-adornment-phone">
                  Adresse
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-phone"
                  value={values.adresse}
                  onChange={handleChange('adresse')}
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
                <InputLabel htmlFor="outlined-adornment-mail">
                 Prix
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-mail"
                  value={values.prix}
                  onChange={handleChange('prix')}
                  endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        edge="end">
                            <AccountCircleOutlinedIcon />
                        </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
              </FormControl>  
              <FormControl
                className={clsx(classes.margin, classes.textField)}
                variant="outlined">
                <InputLabel htmlFor="outlined-adornment-adesion">
                   Capacite
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-adesion"
                  value={values.capacite}
                  onChange={handleChange('capacite')}
                  endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        edge="end">
                            <AccountCircleOutlinedIcon />
                        </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={150}
                />
              </FormControl>
              <FormControl
                className={clsx(classes.margin, classes.textField)}
                variant="outlined">
                <InputLabel htmlFor="outlined-adornment-adesion">
                  Type
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-adesion"
                  value={values.type}
                  onChange={handleChange('type')}
                  endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        edge="end">
                            <AccountCircleOutlinedIcon />
                        </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={150}
                />
              </FormControl>
            </div>
            <Button  variant="contained"
                     size="medium"
                     color="secondary" style={{marginLeft:"57%"}} onClick={updateLocal}>
             Modifier Local
            </Button>
            <br /><br />
        </ form>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default LocalUpdate;
