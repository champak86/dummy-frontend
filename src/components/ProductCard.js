import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import '../App.css';

const useStyles = makeStyles({
  root: {
    maxWidth: 350,
    height: 350,
  },
  media: {
    height: 140,
  },
});

const ProductCard = ({ item }) => {
  const classes = useStyles();
  return (
    <div key={item._id} className="card-container">
      <Card className={classes.root}>
        <div className="image-container">
          <CardMedia className={classes.media} image={item.image} />
        </div>
        <CardContent className="text-container">
          <h3 className="title">{item.title}</h3>
        </CardContent>
        <div className="action-center">
          <span className="left-text">{item.description}</span>
        </div>
      </Card>
    </div>
  );
};

export default ProductCard;
