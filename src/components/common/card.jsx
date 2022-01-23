import React from "react";
// import { getSuppliers } from "../../services/supplierService";

const Card = ({
  title,
  description,
  url,
  user,
  supplier,
  price,
  createdAt,
  ...rest
}) => {
  return (
    <div className="card h-100">
      <div className="card-header text-muted">
        <span className="text-muted">
          <small className="text-muted">
            published by{" "}
            {getSuppliers().find((s) => s._id === supplier).businessName}
          </small>
        </span>
      </div>
      <img className="card-img-top " src={url} alt={title} {...rest} />

      <div className="card-body">
        <hr />
        <h5 className="card-title">
          <strong>{title}</strong>
        </h5>
        <hr />
        <p className="card-text">{description}</p>
      </div>
      <div className="card-footer">
        <strong className="text-muted">{price} $$</strong>
      </div>
    </div>
  );
};

export default Card;
