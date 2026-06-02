import {
  createContext,
  useContext,
  useState,
} from "react";

import FeedbackModal from "@/components/ui/FeedbackModal";

const FeedbackContext =
  createContext(null);

export function FeedbackProvider({
  children,
}) {
  const [feedback, setFeedback] =
    useState({
      open: false,
      type: "success",
      title: "",
      message: "",
    });

  const close = () => {
    setFeedback((prev) => ({
      ...prev,
      open: false,
    }));
  };

  const showSuccess = (
    message,
    title = "SUCCESS"
  ) => {
    setFeedback({
      open: true,
      type: "success",
      title,
      message,
    });

    setTimeout(close, 2500);
  };

  const showError = (
    message,
    title = "WARNING"
  ) => {
    setFeedback({
      open: true,
      type: "warning",
      title,
      message,
    });
  };

  return (
    <FeedbackContext.Provider
      value={{
        showSuccess,
        showError,
        close,
      }}
    >
      {children}

      <FeedbackModal
        open={feedback.open}
        type={feedback.type}
        title={feedback.title}
        message={feedback.message}
        onClose={close}
      />
    </FeedbackContext.Provider>
  );
}

export function useFeedback() {
  const context =
    useContext(FeedbackContext);

  if (!context) {
    throw new Error(
      "useFeedback must be used inside FeedbackProvider"
    );
  }

  return context;
}