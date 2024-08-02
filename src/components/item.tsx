import React, { forwardRef } from "react";

const Item = forwardRef<HTMLDivElement, { id: string }>(
  ({ id, ...props }, ref) => {
    return (
      <div {...props} ref={ref} className="item">
        {id}
      </div>
    );
  },
);

export default Item;
