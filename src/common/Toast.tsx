import { notification } from "antd";

interface props {
  type: "success" | "error" | "info" | "warning";
  message: string;
  description: string;
}

const Toast = ({ type, message, description }: props) => {
  const showNotification = () => {
    notification[type]({
      message: <p className="font-semibold text-[14px]">{message}</p>,
      description: (
        <p className="text-[12px] text-gray-600 font-semibold">{description}</p>
      ),
      duration: 3,
      placement: "topRight",
      showProgress: true,
    });
  };
  return showNotification;
};

export default Toast;
