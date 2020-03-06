import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import 'typeface-roboto';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardText from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import TimerIcon from '@material-ui/icons/Timer';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useHistory } from "react-router-dom";
import useBoundingclientrect from "@rooks/use-boundingclientrect"
import './display.css';

const useStyles = makeStyles({
    root: {
        maxWidth: 500,
        marginBottom: 15,
        borderRadius: 0
    },
    media: {
        height: 232,
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
        }
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
                    mainImageUrl: propData.mainImageUrl
                }
            },
        });
        
    };

    return (
        <div ref={refContainer}>
            <Card onClick={() => goToDisplay(props)} className="display">
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={props.mainImageUrl}
                        title="Contemplative Reptile">
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
                                    {/* <IconButton
                                    iconStyle={classes.actions.icon}
                                    style={classes.actions.button}
                                > */}
                                    <TimerIcon />
                                    {/* </IconButton> */}
                                    {/* <IconButton
                                    iconStyle={classes.actions.icon}
                                    style={classes.actions.button}
                                > */}
                                    <ShareIcon />
                                    {/* </IconButton> */}
                                    {/* <IconButton
                                    iconStyle={classes.actions.icon}
                                    style={classes.actions.button}
                                > */}
                                    <MoreVertIcon />
                                    {/* </IconButton> */}
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
                                {/* <div className="display-description">
                                    {expanded &&
                                        <Typography variant="body1" component="p">
                                            {props.description}
                                        </Typography>
                                    }
                                </div> */}
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