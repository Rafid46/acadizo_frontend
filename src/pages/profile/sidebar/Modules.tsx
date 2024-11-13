/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Collapse, notification } from "antd";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";

const Modules = () => {
  //   const { user }: any = useContext(AuthContext);
  const handle = () => {
    notification.success({
      message: (
        <p className="font-semibold text-[14px]">Registration success</p>
      ),
      description: (
        <p className="text-[12px] text-gray-600">
          Account registered successfully
        </p>
      ),
      duration: 3,
      placement: "topRight",
      showProgress: true,
    });
  };
  return (
    <div>
      <Collapse
        className="w-full lg:w-[500px]"
        items={[
          {
            key: "1",
            label: (
              <p className="!font-semibold">
                This is default size panel header
              </p>
            ),
            children: <p className="">this is our first module</p>,
          },
        ]}
      />
      <div>
        <Button onClick={handle}>trigger</Button>
      </div>
    </div>
  );
};

export default Modules;
