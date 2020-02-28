import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        marginBottom: 15,
    },
    media: {
        height: 140,
    },
});

const Display = (props) => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);

    // const dealWithExpandedClick = (props) => {
    //     setExpanded(!expanded);
    // };

    return (


        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={props.mainImageUrl}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Share
        </Button>
                <Button size="small" color="primary">
                    Learn More
        </Button>
            </CardActions>
        </Card>

        // <Card className={classes.root}>
        //     <CardHeader
        //         avatar = {
        //             <Avatar aria-label="recipe" className={classes.avatar}>V</Avatar>
        //         }
        //         action = {
        //             <IconButton aria-label="settings">
        //                 <MoreVertIcon />
        //             </IconButton>
        //         }
        //         title = {props.name}
        //         subheader = {props.location}
        //     />
        //     <CardMedia
        //         className={classes.media}
        //         image={props.mainImageUrl}
        //         title={props.imageTitle}
        //     />
        //     <CardContent>
        //         <Typography variant="body2" color="textSecondary" component="p">
        //            {props.description} 
        //         </Typography>
        //     </CardContent>

        //     <CardActions disableSpacing>
        //         <IconButton aria-label="add to favorites">
        //             <FavoriteIcon />
        //         </IconButton>
        //         <IconButton aria-label="share">
        //             <ShareIcon />
        //         </IconButton>
        //         <IconButton
        //             className={clsx(classes.expand, {
        //                 [classes.expandOpen]: expanded,
        //             })}
        //             onClick={dealWithExpandedClick}
        //             aria-expanded={expanded}
        //             aria-label="show more"
        //         >
        //             <ExpandMoreIcon />
        //         </IconButton>
        //     </CardActions>
        //     <Collapse in={expanded} timeout="auto" unmountOnExit>
        //         <CardContent>
        //             <Typography paragraph>Method:</Typography>
        //         </CardContent>
        //     </Collapse>
        // </Card>
    )
}

export default Display;