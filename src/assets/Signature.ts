import React from "react";

interface SignatureProps {
  type: "1" | "2" | "3"; // Limiting 'type' to either "1" or "2"
}

const Signature: React.FC<SignatureProps> = ({ type }) => {
  if (type === "1") {
    console.log(
      `
  %c
    __     ___      ___   ________  
   |" \\   |"  \\    /"  | /"       ) 
   ||  |   \\   \\  //   |(:   \\___/  
   |:  |   /\\  \\/.    | \\___  \\    
   |.  |  |: \\        |  __/  \\   
   /\\  |\\ |.  \\    /:  | /" \\   :)  
  (__\\_|_)|___|\\__/|___|(_______/   
  `,
      "color: #009688; font-size: 12px; font-weight: bold;"
      //   "color: #000000; font-size: 14px;",
      //   "color: #FF5722; font-size: 14px;"
    );
  } else if (type === "2") {
    console.log(
      `
      %c
    
██╗███╗   ███╗███████╗
██║████╗ ████║██╔════╝
██║██╔████╔██║███████╗
██║██║╚██╔╝██║╚════██║
██║██║ ╚═╝ ██║███████║
╚═╝╚═╝     ╚═╝╚══════╝
                            
      
%cWelcome to iMS - Inventory Management System! %c🚀 Let's manage your inventory efficiently! 🚀`,
      "color: #009688; font-size: 20px; font-weight: bold;",
      "color: #000000; font-size: 14px;",
      "color: #FF5722; font-size: 14px;"
    );
  } else if (type === "3") {
    console.log(
      `
      %c

      d8b 888b     d888  .d8888b.  
      Y8P 8888b   d8888 d88P  Y88b 
          88888b.d88888 Y88b.      
      888 888Y88888P888  "Y888b.   
      888 888 Y888P 888     "Y88b. 
      888 888  Y8P  888       "888 
      888 888   "   888 Y88b  d88P 
      888 888       888  "Y8888P"  
                                   
%cWelcome to iMS - Inventory Management System! %c🚀 Let's manage your inventory efficiently! 🚀`,
      "color: #009688; font-size: 20px; font-weight: bold;",
      "color: #000000; font-size: 14px;",
      "color: #FF5722; font-size: 14px;"
    );
  }

  return null; // Return null to satisfy React.FC expectations
};

export default Signature;
