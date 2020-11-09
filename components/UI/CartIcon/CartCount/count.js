import React from 'react';

const count = (props) => {
    return(
        <p className={props.items.length != null && props.items.length > 0 ? props.styles_prikazi : props.styles_nema}>{props.items.length}</p>
    );
}

export default count;