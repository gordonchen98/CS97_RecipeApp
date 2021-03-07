import React, { useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { SelectedList, IngredientResults } from './listItems';
import Paper from '@material-ui/core/Paper'
import AddIcon from '@material-ui/icons/Add';

import Popup from './components/Popup'
import RecipeForm from './Form.js'
import { Button } from '@material-ui/core';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },

  pageContent:{
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [ingredientsArray, setIngredients] = React.useState( [ 
    {index: 0, name: "Meat", chk: [false, false, false, false]}, {index: 1, name: "Vegetables", chk: [false, false, false, false]},
    {index: 2, name: "Dairy", chk:[false,false,false,false]}, {index: 3, name: "Carbohydrates", chk: [false, false, false, false]},
    {index: 4, name: "Seafood", chk: [false, false, false, false]}, {index: 5, name: "Fruits", chk: [false, false, false, false]},
    {index: 6, name: "Condiments/Spices", chk: [false, false, false, false]}
  ])
  const [openPopup, setOpenPopup] = React.useState(false)

  const history = useHistory();
  const [recipes, setRecipes] = React.useState([]);
   
  const fetchRecipe = async() => {
      await fetch('/recipe')
      .then(res => res.json())
      .then(data => {
          setRecipes(data);
      });
  }
  
  const logout = () => {
      localStorage.clear();
      history.push("/");
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleCheckClick = (value, array) => () =>{
    const ingredients = ingredientsArray
    console.log(ingredients)
    const chkArray = array
    console.log(chkArray)
    chkArray[value] = !(chkArray[value])
    setIngredients({ingredients})
  }

  useEffect(()=>{
    fetchRecipe();
    console.log("index changed!: ")
  }, [ingredientsArray])
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Welcome, {localStorage.getItem('name')}
          </Typography>
          <Button color = "inherit" 
          onClick={() =>setOpenPopup(true)}>
            Add User Input Form
            <AddIcon/>
          </Button>
          <Popup
            title = "Recipe Form"
            openPopup = {openPopup}
            setOpenPopup = {setOpenPopup}
          >
            <RecipeForm />
          </Popup>
          <IconButton color="inherit" onClick={() => logout()}>
            <ExitToAppIcon />
            Logout
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <SelectedList ingredientsArray = {ingredientsArray}
         handleCheckClick = {handleCheckClick} />
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} /> 
        <Container maxWidth="lg" className={classes.container}>
          <IngredientResults ingredientsArray = {ingredientsArray} recipeList = {recipes}/>
          {/* <Box pt={4}>
            <Copyright />
          </Box> */}
        </Container>
      </main>
    </div>
  );
}

/*import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

import Upload from './Upload.js';

// The Header creates links that can be used to navigate
// between routes.
function Dashboard() {
    const history = useHistory();

    // Update user after query
    const [user, setUser] = useState(null);
    // Use getItem to get the value stored in localStorage
    const googleId = localStorage.getItem('googleId');
    
    const fetchUser = async() => {
        await fetch(`/user?googleId=${googleId}`)
        .then(res => res.json())
        .then(data => {
            setUser(data);
        });
    }
    
    function logout() {
        localStorage.clear();
        history.push("/");
    }

    return (
        <div>
            <div>
                {user && user.map((user, index) => {
                    return (
                        <div key = {index}>
                            <p>Welcome {user.displayName}</p>
                            <p>googleId: {user.googleId}</p>
                        </div>
                    )
                })}
            </div>
            <Upload/>
            <button onClick={fetchUser}>
                Fetch
            </button>
            <button onClick={logout}>
                Log Out
            </button>
        </div>
    )
}*/