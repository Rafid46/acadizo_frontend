/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
const CustomButton = ({ loading, buttonText }: any) => {
  return (
    <div>
      <Button
        style={{
          transition: "background-color 0.3s ease",
        }}
        type="primary"
        className="hover-button text-sm font-semibold h-[40px] px-8 border-none shadow-none !bg-secondary-color text-white"
      >
        {loading ? (
          <Spin
            style={{
              color: "white",
            }}
            indicator={<LoadingOutlined spin />}
          />
        ) : (
          buttonText
        )}
      </Button>
    </div>
  );
};

export default CustomButton;
