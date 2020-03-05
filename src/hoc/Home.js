import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import DisplaysBuilder from '../containers/DisplaysBuilder';
import YoutubeSearchedForIcon from '@material-ui/icons/YoutubeSearchedFor';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition as OriginalCSSTransition } from 'react-transition-group';
import { useHistory } from "react-router-dom";
import Display from '../components/Display/Display';
import '../hoc/home.css';

class CSSTransition extends OriginalCSSTransition {
    onEntered = () => {
        // Do not remove enter classes when active
    }
}

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    },
}));

function Home(props) {
    const { location } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);
    let history = useHistory();


    const modal = location.state && location.state.to === 'modal';
    let pos = {};
    let key;
    let id;
    let name;
    let domain;
    let loc;
    let description;
    let mainImageUrl;

    if (modal) {
        pos = location.state.meta.from;
        key = location.state.data.id;
        id = location.state.data.id;
        name = location.state.data.name;
        domain = location.state.data.domain
        loc = location.state.data.location
        description = location.state.data.description
        mainImageUrl = location.state.data.mainImageUrl
    }


    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const goBack = () => {
        history.goBack();
    };

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        geo context app
          </Typography>
                    <IconButton>
                        <YoutubeSearchedForIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        location={location}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className="view-container" />
                <Switch location={modal ? location.previousView : location}>
                    <Route exact path="/" component={DisplaysBuilder} />
                </Switch>

                <TransitionGroup>
                    <CSSTransition
                        timeout={450}
                        classNames="modal"
                        key={location.pathname}
                        mountOnEnter
                        appear
                    >
                        <div className="modal-container" style={pos}>
                            <Switch location={location}>
                                <Route path="/display/:id" component={() => <Display
                                    key={key} id={id}
                                    name={name}
                                    domain={domain}
                                    location={loc}
                                    description={description}
                                    mainImageUrl={mainImageUrl}
                                    expanded
                                    showActions
                                    goBack={goBack} />} />
                            </Switch>
                        </div>
                    </CSSTransition>
                </TransitionGroup>
            </main>
        </div>
    );
}

export default Home;


// import React, { useState } from 'react';
// import Aux from '../auxiliar/auxiliar';
// import NavBar from '../components/Layout/Navbar';
// import DisplaysBuilder from '../containers/DisplaysBuilder';

// const Home = (props) => {
//     return (
//         <Aux>
//             <NavBar />

//                 <DisplaysBuilder />

//         </Aux>
//     )
// }

// export default Home;