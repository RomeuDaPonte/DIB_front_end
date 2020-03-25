import { useState } from "react";

export const useModalToogle = initialModalState => {
  const [currentModalState, setModalState] = useState(initialModalState);

  function toogleModal() {
    if (currentModalState.show) setModalState({ show: false });
    else setModalState({ show: true });
  }

  return [currentModalState, toogleModal];
};
