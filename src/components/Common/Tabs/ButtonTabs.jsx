import { Box, Button } from "@mui/material";
import React from "react";

const ButtonTabs = ({ values, handleClick, activeTab }) => {

  return (
    <Box>
      {values.map((value, index) => (
        <Button
          sx={{ mb: 1, mr: 1, ml: index > 0 ? 1 : 0, textTransform: 'none' }}
          variant={activeTab === index ? 'contained' : 'text' }
          color={activeTab === index ? 'secondary' : 'primary'}
          size="small"
          onClick={() => handleClick(index)}
        >
          {value}
        </Button>

      ))}
    </Box>
  );
}

export default ButtonTabs;