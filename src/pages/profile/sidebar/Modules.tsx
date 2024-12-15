/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Collapse } from "antd";
import { useContext, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const Modules = ({ placeholder, onChange, value }: any) => {
  const [content, setContent] = useState<string>(value || "");

  const handleChange = (newContent: string) => {
    setContent(newContent);
    if (onChange) {
      onChange(newContent);
    }
  };
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
      <div className="border border-gray-300 rounded-md shadow-sm p-4 w-full max-w-lg">
        <ReactQuill
          theme="snow"
          value={content}
          onChange={handleChange}
          placeholder={placeholder || "Start typing..."}
          className="text-gray-700"
        />
      </div>
    </div>
  );
};

export default Modules;
