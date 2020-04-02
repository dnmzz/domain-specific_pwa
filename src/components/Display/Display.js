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
        const actual_location = window.location.href;
        if (!actual_location.includes("/display")) {
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

    return (
        <div ref={refContainer}>
            <Card onClick={() => goToDisplay(props)} className="display">
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={props.mainImageUrl}>
                        <div className="header">
                            <div className="actions left">
                                {goBack &&
                                    // <IconButton
                                    //     iconstyle={classes.actions.icon}
                                    //     style={classes.actions.button}
                                    //     // onClick={}
                                    //     id="back-button"
                                    // >
                                    <ArrowBackIcon onClick={goBack} />
                                    // </IconButton>
                                }
                            </div>
                            {showActions &&
                                <div className="actions right">
                                    <div className="floating">
                                        <div className="like">
                                            <FavoriteBorderIcon style={classes.actions.likeIcon} />
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </CardMedia>
                    <div className="title">
                        <img src="https://www.gstatic.com/angular/material-adaptive/pesto/quick.png" alt="" />
                        <div className="display-cover-content">
                            <CardContent>
                                <div className="display-name">
                                    <Typography variant="h5" component="h2">
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
                </CardActionArea>
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