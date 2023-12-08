import React from "react";
import {Button} from "react-bootstrap";
import {Favorite} from "@material-ui/icons"

const LikeButton = ({ size, icon, color, addClasses, fullWidth, disabled, children, ...buttonProps }) => {
  return (
    <button
    aria-disabled={disabled} 
    className= {disabled ? "bg-color2 opacity-50 cursor-not-allowed p-2 rounded-md outline-none border-none text-white" : "bg-color2 hover:bg-color2Hover p-2 rounded-md outline-none border-none text-white"}
              {...buttonProps}
          >
              {children}
              <Favorite/>
    </button>
  );
};

export default LikeButton