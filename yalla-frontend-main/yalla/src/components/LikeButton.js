import React from "react";
import {Button} from "react-bootstrap";
import {Favorite} from "@material-ui/icons"

const LikeButton = ({ size, icon, color, addClasses, fullWidth, disabled, children, ...buttonProps }) => {
  return (
    <Button
    aria-disabled={disabled} 
    className= {disabled ? "btn btn-danger disabled" : "btn btn-danger"}
              {...buttonProps}
          >
              {children}
              <Favorite/>
    </Button>
  );
};

export default LikeButton