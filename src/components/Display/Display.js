import React, { useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import 'typeface-roboto';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from "react-router-dom";
import useBoundingclientrect from "@rooks/use-boundingclientrect"
import SwipeableTextMobileStepper from '../Poster/Poster';
import Button from '@material-ui/core/Button';
import Switch from "react-switch";
// import Switch from '@material-ui/core/Switch';
import './display.css';

const useStyles = makeStyles({
    root: {
        maxWidth: 500,
        marginBottom: 15,
        borderRadius: 0
    },
    media: {
        height: 210,
    },
    media_normal: {
        height: 141,
    },
    actions: {
        icon: {
            width: 30,
            height: 30,
            color: 'white',
        },
        button: {
            width: 60,
            height: 60,
            color: 'white'
        },
        likeIcon: {
            width: '43%',
            height: '43%',
            color: 'white',
        },
    }
});

const Display = (props) => {
    const classes = useStyles();
    let expanded = props.expanded;
    let showActions = props.showActions;
    let goBack = props.goBack;
    let history = useHistory();
    const refContainer = useRef(null);
    const getBoundingClientRect = useBoundingclientrect(refContainer);
    const [switchState, setSwitchState] = useState({
        checked: false
    });

    const goToDisplay = (propData) => {
        const { top, right, bottom, left, width, height } = getBoundingClientRect;
        let actual_location = window.location.href.split('/');

        if (actual_location[3].includes("home")) {
            history.push({
                pathname: `/display/${propData.id}`,
                state: {
                    to: 'modal',
                    meta: {
                        from: { top, right, bottom, left, width, height }
                    },
                    data: {
                        id: propData.id,
                        name: propData.name,
                        domain: propData.domain,
                        location: propData.location,
                        description: propData.description,
                        mainImageUrl: propData.mainImageUrl,
                        posters: propData.posters
                    }
                },
            });
        }
    };

    const navToPosterFullscreen = (posters) => {
        const { top, right, bottom, left, width, height } = getBoundingClientRect;
        history.push({
            pathname: `/posters/fullscreen`,
            state: {
                to: 'modal',
                meta: {
                    from: { top, right, bottom, left, width, height }
                },
                type: "poster",
                posters: posters
            },
        });
    }

    const addToBookmarks = (propData) => {
        alert(propData.name + ' added to bookmarks!');
    };

    const handleSwithChange = (event) => {
        setSwitchState({ ...switchState, checked: !switchState.checked });
        navToPosterFullscreen(props.posters);
    };

    return (
        <div ref={refContainer}>
            <Card onClick={() => goToDisplay(props)} className="display">
                {expanded ?
                    <CardMedia
                        className={classes.media_normal}
                        image={props.mainImageUrl}>
                        <div className="header">
                            <div className="actions left">
                                {goBack &&
                                    <ArrowBackIcon onClick={goBack} />
                                }
                            </div>
                            {showActions &&
                                <div className="actions right">
                                    <div className="floating">
                                        <CardActionArea>
                                            <div className="like">
                                                <FavoriteBorderIcon onClick={() => addToBookmarks(props)} style={classes.actions.likeIcon} />
                                            </div>
                                        </CardActionArea>
                                    </div>
                                </div>
                            }
                        </div>
                    </CardMedia>

                    :

                    <CardMedia
                        className={classes.media}
                        image={props.mainImageUrl}>
                        <div className="header">
                            <div className="actions left">
                                {goBack &&
                                    <ArrowBackIcon onClick={goBack} />
                                }
                            </div>
                            {showActions &&
                                <div className="actions right">
                                    <div className="floating">
                                        <CardActionArea>
                                            <div className="like">
                                                <FavoriteBorderIcon onClick={() => addToBookmarks(props)} style={classes.actions.likeIcon} />
                                            </div>
                                        </CardActionArea>
                                    </div>
                                </div>
                            }
                        </div>
                    </CardMedia>
                }
                <div className="title">
                    <img src="https://pngimage.net/wp-content/uploads/2018/05/christian-cross-png-6.png" alt="" />
                    <div className="display-cover-content">
                        <CardContent>
                            <div className="display-name">
                                <Typography variant="h6" component="h2">
                                    {props.name}
                                </Typography>
                            </div>

                            <div className="display-location">
                                <Typography variant="subtitle1" color="textSecondary" component="p">
                                    {props.location}
                                </Typography>
                            </div>
                            <div className="display-description">
                                {expanded &&
                                    <Typography variant="body1" component="p">
                                        {props.description}
                                    </Typography>
                                }
                            </div>
                            {expanded &&
                                <div className="posters">
                                    <div className="posters-title-header">
                                        {/* <Button onClick={() => navToPosterFullscreen(props.posters)} variant="outlined" size="small" color="primary" className={classes.margin}>
                                            Fullsceen Mode
                                        </Button> */}
                                        <Switch onChange={handleSwithChange} checked={switchState.checked} onColor="#f50057"
                                            onHandleColor="#f50057"
                                            handleDiameter={30}
                                            uncheckedIcon={false}
                                            checkedIcon={false}
                                            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                            height={20}
                                            width={48}
                                            className="react-switch"
                                            id="material-switch" />
                                    </div>
                                    <SwipeableTextMobileStepper posters={props.posters} />
                                </div>
                            }
                        </CardContent>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default Display;