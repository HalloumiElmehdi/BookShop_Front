
const TagsInput = ({
    tags = [],
    name,
    label,
    value,
    isIdle,
    error,
    onClick,
    ...rest }) => {
    let classes = "form-control ";
    if (isIdle != null) classes += error ? "is-invalid" : "is-valid";
    return (
        <div className="form-group ">
            <div  className="input-tag  is-invalid">
                <ul className="input-tag__tags ">
                    {tags.map((tag, i) => (
                        <li key={tag}>
                            {tag}
                            <button type="button" onClick={(e) => onClick(e, i)} >+</button>
                        </li>
                    ))}
                    <li className="input-tag__tags__input  ">
                        <input
                            id={name}
                            name={name}
                            type="text"
                            placeholder={label}
                            className={classes}
                             {...rest}
                        />
                    </li>
                   
                </ul>
               
            </div>
        {error && <div className="invalid-feedback">{error}</div>}
        {<div className="valid-feedback"></div>}
           
        </div>
    )
};
export default TagsInput;