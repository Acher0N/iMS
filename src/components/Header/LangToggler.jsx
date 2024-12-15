import React from "react";
import { Switch, FormControlLabel } from "@mui/material";
import "./LangToggler.scss";

// Flag icons as elements (can be replaced with better quality flag images)
const USFlag = '<img src="https://flagcdn.com/w320/us.png" alt="US English" class="flag-icon" />';
const SAFlag = '<img src="https://flagcdn.com/w320/sa.png" alt="Saudi Arabic" class="flag-icon" />';

// Main LanguageToggle component
function LangToggler({ language, onToggle }) {
  const handleChange = (event) => {
    onToggle(event.target.checked ? "sa-ar" : "us-en");
    console.log(event.target.checked);
  };

  return (
    <div class="language-toggle">
      <FormControlLabel
        control={
          <Switch
            checked={language === "sa-ar"}
            onChange={handleChange}
            color="primary"
            icon={<span dangerouslySetInnerHTML={{ __html: USFlag }}></span>}
            checkedIcon={<span dangerouslySetInnerHTML={{ __html: SAFlag }}></span>}
          />
        }
        label=""
      />
    </div>
  );
}

export default LangToggler;
