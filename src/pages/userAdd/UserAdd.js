import React, { Fragment } from 'react';

import clsx from 'clsx';
import axios from "axios";
import {
  Grid,
  Button,
  InputLabel,
  InputAdornment,
  IconButton,
  Card,
  FormControl,
  Divider
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
const baseURL = "http://127.0.0.1:8000/user";
const UserAdd = () => {
  const classes = useStyles();
  const cardStyle={
    width: "100%",
    borderRadius: "3%",
    marginLeft:"200px"
  }
  const [values, setValues] = React.useState({
    firstName: "",
    lastName:  "",
    email: "",
    phoneNumber: "",
    numAdesion: ""
  });
    const addUser = async (e) => {
        e.preventDefault()
        await axios.post(baseURL,values).then((response) => {
            console.log(response.data)
          });
    }
    

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
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
                  Prenom
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-fname"
                  value={values.firstName}
                  onChange={handleChange('firstName')}
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
                 Nom
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-lname"
                  value={values.lastName}
                  onChange={handleChange('lastName')}
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
                  Numéro de Téléphone
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-phone"
                  value={values.phoneNumber}
                  onChange={handleChange('phoneNumber')}
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
                  Email
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-mail"
                  value={values.email}
                  onChange={handleChange('email')}
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
                  Numéro d'adhesion
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-adesion"
                  value={values.numAdesion}
                  onChange={handleChange('numAdesion')}
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
                     color="secondary" style={{marginLeft:"57%"}} onClick={addUser}>
             Ajouter Utilisateur
            </Button>
            <br /><br />
        </ form>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default UserAdd;
