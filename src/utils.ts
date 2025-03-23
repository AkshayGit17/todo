import { toast, ToastPosition, TypeOptions } from "react-toastify";

type displayToastType = {
  message: string;
  type: TypeOptions;
  position?: ToastPosition;
  autoClose?: number;
};

export const displayToast = ({
  message,
  type,
  position = "top-right",
  autoClose = 1500,
}: displayToastType) => {
  const options = {
    position,
    autoClose,
  };
  switch (type) {
    case "success":
      toast.success(message, options);
      console.log(options);
      break;
    case "error":
      toast.error(message, options);
      break;
    case "warning":
      toast.warn(message, options);
      break;
    default:
      toast.info(message, options);
  }
};
