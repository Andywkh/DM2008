import React from "react";

import picture from "./images/picture.png"

class Arch extends React.Component {

   render() {
    return (
        <div>
            <img src={picture} />
        </div>
    );
}
}

export default Arch;