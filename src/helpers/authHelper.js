import { useSnackbarBeforeReload } from "../components/Common/Snackbar/SnackbarQueue";
import { logout } from "../services/userManager";

export const handleLogout = async () => {
  const callbackMessage = await logout();
  const enqueueSnackbarReload = useSnackbarBeforeReload();
  enqueueSnackbarReload(callbackMessage.message, callbackMessage.type);
  window.location.reload();
};