import React from "react";
import ReactTooltip from "react-tooltip";

const TooltipWithIcon = ({ tooltipMessage, faIcon, faSize }) => {
  return (
    <React.Fragment>
      <ReactTooltip
        id={tooltipMessage}
        className="toolTipMd"
        place="bottom"
        delayHide={500}
      />
      <i
        data-for={tooltipMessage}
        data-tip={tooltipMessage}
        className={`${faIcon} ${faSize} btnClick`}
      ></i>
    </React.Fragment>
  );
};

export default TooltipWithIcon;
