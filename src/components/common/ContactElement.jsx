import React from 'react';

const ContactElement = ({icon,title,subTitle}) => {
    return (
        <div className="contact__widget">
            <span className={icon}/>
            <h4>{title}</h4>
            <p>{subTitle}</p>
        </div>
    );
};

export default ContactElement;
