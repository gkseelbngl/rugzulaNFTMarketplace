import { createGlobalState } from "react-hooks-global-state";

const { setGlobalState, useGlobalState, getGlobalState } = createGlobalState({
  modal: "scale-0",
  updateModal: "scale-0",
  showModal: "scale-0",
  alert: { show: false, msg: "", color: "" },
  loading: { show: false, msg: "" },
  connectedAccount: "",
  nft: null,
  nfts: [],
  transactions: [],
  contract: null,
});

const setAlert = (msg, color = "green") => {
  if (!msg || typeof msg !== "string" || msg.trim() === "") return;

  console.log("Alert tetiklendi:", msg, color);
  setGlobalState("loading", { show: false, msg: "" });
  setGlobalState("alert", { show: true, msg, color });

  setTimeout(() => {
    setGlobalState("alert", { show: false, msg: "", color });
  }, 6000);
};

const setLoadingMsg = (msg) => {
  const loading = getGlobalState("loading");
  setGlobalState("loading", { ...loading, msg });
};

const truncate = (text, startChars, endChars, maxLength) => {
  if (text.length > maxLength) {
    var start = text.substring(0, startChars);
    var end = text.substring(text.length - endChars, text.length);
    while (start.length + end.length < maxLength) {
      start = start + ".";
    }
    return start + end;
  }
  return text;
};

export {
  useGlobalState,
  setGlobalState,
  getGlobalState,
  setAlert,
  setLoadingMsg,
  truncate,
};
