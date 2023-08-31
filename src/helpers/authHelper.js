import { useSnackbarBeforeReload } from "../components/Common/Snackbar/SnackbarQueue";
import { useUserManager } from "../services/userManager";

export const handleLogout = async () => {
  const userManager = useUserManager();
  const callbackMessage = await userManager.logout();
  const enqueueSnackbarReload = useSnackbarBeforeReload();
  enqueueSnackbarReload(callbackMessage.message, callbackMessage.type);
  window.location.reload();
};