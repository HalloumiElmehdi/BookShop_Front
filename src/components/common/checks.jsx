import Check from "./check";

const Checks = ({ items = [], ...rest}) => {

  return (
    <div className="form-group ">
      {items.map((item) => (
        <Check
          value={item._id}
          label={item.label}
          id={item._id}
          key={item._id}
          checked={rest.choosed ? rest.choosed.includes(item._id) : null}
          {...rest}
        />
      ))}
    </div>
  );
};
export default Checks;

