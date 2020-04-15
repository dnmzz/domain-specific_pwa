import React, { useState, useRef } from 'react';
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
import Iframe from 'react-iframe';
import SwipeableTextMobileStepper from '../Poster/Poster';
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

    const addToBookmarks = (propData) => {
        alert(propData.name + ' added to bookmarks!');
    };

    return (
        <div ref={refContainer}>
            <Card onClick={() => goToDisplay(props)} className="display">
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
                                        <Typography variant="h5" component="h2">
                                            P O S T E R S
                                        </Typography>
                                    </div>
                                    <SwipeableTextMobileStepper posters={props.posters} />
                                </div>
                            }
                        </CardContent>
                    </div>
                </div>

                {/* <CardActions>
                    <Button size="small" color="primary">
                        Share
                </Button>
                    <Button size="small" color="primary">
                        Learn More
                </Button>
                </CardActions> */}
            </Card>
        </div>
    )
}

export default Display;