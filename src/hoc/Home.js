import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import InfoIcon from '@material-ui/icons/Info';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import DisplaysBuilder from '../containers/DisplaysBuilder';
import { Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition as OriginalCSSTransition } from 'react-transition-group';
import { useHistory } from "react-router-dom";
import Display from '../components/Display/Display';
import LandingPage from '../pages/LandingPage';
import '../hoc/home.css';
import PosterFullScreen from '../components/Poster/PosterFullScreen';

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
        backgroundColor: '#324B7A'
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
        backgroundColor: 'white'
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
    let id;
    let name;
    let domain;
    let loc;
    let description;
    let mainImageUrl;
    let arr = location.array;
    let posters;


    if (modal && !location.state.type) {
        pos = location.state.meta.from;
        id = location.state.data.id;
        name = location.state.data.name;
        domain = location.state.data.domain
        loc = location.state.data.location
        description = location.state.data.description
        mainImageUrl = location.state.data.mainImageUrl
        posters = location.state.data.posters
    } else if (modal && location.state.type) {
        posters = location.state.posters
    }


    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const goBack = () => {
        history.goBack();
    };

    const dealWithDrawerClick = (index) => {
        switch (index) {
            case 0:
                history.push({
                    pathname: '/settings'
                });

                break;
            case 1:
                history.push({
                    pathname: '/bookmarks'
                });
                break;
            case 2:
                history.push({
                    pathname: '/about_domain'
                });
                break;
            default:
                history.push({
                    pathname: '/logout'
                });
                break;
        }
    };
    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List>
                {['Settings', 'Bookmarks', 'Domain', 'Logout'].map((text, index) => (
                    <ListItem button key={text} onClick={() => dealWithDrawerClick(index)}>
                        <ListItemIcon>
                            {
                                index === 0 ? <SettingsIcon /> : index === 1 ? <BookmarkIcon /> : index === 2 ? <InfoIcon /> : <ExitToAppIcon />
                            }
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
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
                    <Typography variant="h5" noWrap>
                        geo context app
                    </Typography>
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
                {/* landing page route */}
                <div className="view-container">
                    <Switch location={modal ? props.location : location}>
                        <Route exact path="/" component={() => <LandingPage />} />
                    </Switch>
                </div>

                {/* home route */}
                <div className="view-container">
                    <Switch location={modal ? props.location : location}>
                        <Route exact path="/home" component={() => <DisplaysBuilder />} />
                    </Switch>
                </div>

                {/* user settings route */}
                <div className="view-container">
                    <Switch location={modal ? props.location : location}>
                        <Route exact path="/settings" component={() => <LandingPage />} />
                    </Switch>
                </div>

                {/* bookmarks route */}
                <div className="view-container">
                    <Switch location={modal ? props.location : location}>
                        <Route exact path="/bookmarks" component={() => <LandingPage />} />
                    </Switch>
                </div>

                {/* about_domain route */}
                <div className="view-container">
                    <Switch location={modal ? props.location : location}>
                        <Route exact path="/about_domain" component={() => <LandingPage />} />
                    </Switch>
                </div>

                {/* logout route */}
                <div className="view-container">
                    <Switch location={modal ? props.location : location}>
                        <Route exact path="/logout" component={() => <LandingPage />} />
                    </Switch>
                </div>

                {/* specific display route */}
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
                                    id={id}
                                    name={name}
                                    domain={domain}
                                    location={loc}
                                    description={description}
                                    mainImageUrl={mainImageUrl}
                                    posters={posters}
                                    expanded
                                    showActions
                                    goBack={goBack} {...arr} />} />
                            </Switch>
                        </div>
                    </CSSTransition>
                </TransitionGroup>

                {/* specific poster fullscreen route */}
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
                                <Route path="/posters/fullscreen" component={() => <PosterFullScreen posters={posters} />}/>
                            </Switch>
                        </div>
                    </CSSTransition>
                </TransitionGroup>

            </main>
        </div>
    );
}

export default Home;