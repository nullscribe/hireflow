import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Snackbar, useTheme } from "react-native-paper";

type Snackbar = {
  showSnackbar: (msg: string) => void;
  hideSnackbar: () => void;
};

const SnackbarContext = createContext<Snackbar | undefined>(undefined);

export function SnackbarProvider({ children }: PropsWithChildren<{}>) {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");

  const showSnackbar = (msg: string) => {
    setMessage(msg);
    setVisible(true);
  };

  const hideSnackbar = () => setVisible(false);

  return (
    <SnackbarContext.Provider value={{ showSnackbar, hideSnackbar }}>
      {children}
      <Snackbar
        visible={visible}
        onDismiss={hideSnackbar}
        duration={3000}
        action={{
          label: "Close",
          onPress: hideSnackbar,
          textColor: theme.colors.secondaryContainer,
        }}>
        {message}
      </Snackbar>
    </SnackbarContext.Provider>
  );
}

export function useSnackbar() {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within SnackbarProvider");
  }
  return context;
}
