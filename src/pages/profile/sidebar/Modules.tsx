/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Collapse, notification } from "antd";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";

const Modules = () => {
  //   const { user }: any = useContext(AuthContext);
  // const handle = () => {
  //   notification.success({
  //     message: (
  //       <p className="font-semibold text-[14px]">Registration success</p>
  //     ),
  //     description: (
  //       <p className="text-[12px] text-gray-600">
  //         Account registered successfully
  //       </p>
  //     ),
  //     duration: 3,
  //     placement: "topRight",
  //     showProgress: true,
  //   });
  // };
  return (
    <div>
      <p className="font-semibold text-2xl text-[#030712] mb-5">Modules</p>
      <Collapse
        className="w-full lg:w-[500px]"
        items={[
          {
            key: "1",
            label: <p className="!font-semibold">Chapter 1: Compiler</p>,
            children: (
              <div className="text-sm text-gray-500">
                <p>All chapters: 10</p>
                <p>Chapter names: </p>
                <p>Description: </p>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

export default Modules;
