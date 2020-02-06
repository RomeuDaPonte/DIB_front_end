import React from "react";
import TooltipWithIcon from "../common/tooltipWithIcon";

const HeaderOrcamento = () => {
  return (
    <div className="headerStyles">
      <div className="container">
        <div className="row justify-content-certer">
          <div className="headerIcon col-2 mt-3">
            <TooltipWithIcon
              faIcon={"fa fa-arrow-circle-left"}
              faSize={"fa-5x"}
              tooltipMessage={"Anterior"}
            />
          </div>
          <div className="headerIcon col-2 mt-3">
            <TooltipWithIcon
              faIcon={"fa fa-arrow-circle-right"}
              faSize={"fa-5x"}
              tooltipMessage={"Proxima"}
            />
          </div>
          <div className="headerIcon col-2 mt-3">
            <TooltipWithIcon
              faIcon={"fa fa-file-pdf-o"}
              faSize={"fa-5x"}
              tooltipMessage={"Obter pdf"}
            />
          </div>
          <div className="headerIcon col-2 mt-3">
            <TooltipWithIcon
              faIcon={"fa fa-check"}
              faSize={"fa-5x"}
              tooltipMessage={"Finalizar"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderOrcamento;
