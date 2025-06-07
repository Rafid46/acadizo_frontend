/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useContext, useRef, useEffect } from "react";
import { Form, Input, Select, Button, notification, Image } from "antd";
import useAxios from "../../hooks/useAxios";
import { AuthContext } from "../../providers/AuthProvider";
import { UploadOutlined } from "@ant-design/icons";
import { RxCross1 } from "react-icons/rx";
import Loader from "../../common/Loader";
import useCurrentUser from "../../hooks/useCurrentUser";
const { Option } = Select;

interface UserData {
  firstName: string;
  lastName: string;
  gender: "male" | "female";
  contactNo: string;
  avatar: string;
  image: any;
  role: string;
}

const UpdateProfile: React.FC = () => {
  const [fileList, setFileList] = useState<any[]>([]);
  const [imageUrl, setImageUrl] = useState(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imageSelected, setImageSelected] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const { data: currentUser }: any = useCurrentUser();
  const [form] = Form.useForm();
  useEffect(() => {
    if (currentUser) {
      form.setFieldsValue({
        firstName: currentUser.firstName || "",
        lastName: currentUser.lastName || "",
        gender: currentUser.gender || "",
        contactNo: currentUser.contactNo || "",
        role: currentUser.role || "",
      });
    }
  }, [currentUser, form]);
  //   const [imageUrl, setImageUrl] = useState<string>();
  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.cloudinary.com/v1_1/${image_hosting_key}/image/upload`;

  //   const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const axiosPublic = useAxios();
  const {
    user,
    updateUserProfile,
    updateUserAvatar,
    loading,
    setLoading,
  }: any = useContext(AuthContext);
  // const src =
  //   "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png";
  const [imageAvatar, setImageAvatar] = useState(user?.photoURL);
  const handleUpdate = async (value: UserData) => {
    setButtonLoading(true);

    // Prepare the MongoDB update payload
    const updateProfileValues: any = {};
    if (value.firstName) updateProfileValues.firstName = value.firstName;
    if (value.lastName) updateProfileValues.lastName = value.lastName;
    if (value.gender) updateProfileValues.gender = value.gender;
    if (value.contactNo) updateProfileValues.contactNo = value.contactNo;
    if (value.role) updateProfileValues.role = value.role;

    try {
      // Update user in MongoDB
      const res = await axiosPublic.put(
        `/api/v1/user/update-user/${user?.email}`,
        updateProfileValues
      );

      notification.success({
        message: (
          <p className="font-semibold text-[14px]">User updated successfully</p>
        ),
        // description: (
        //   <p className="text-[12px] text-gray-600">
        //     Account registered successfully
        //   </p>
        // ),
        duration: 3,
        placement: "topRight",
        showProgress: true,
      });
      // Set displayName to reflect both existing and updated names
      if (value.firstName || value.lastName) {
        // Set displayName to reflect both existing and updated names
        const newFirstName =
          value.firstName || user?.displayName?.split(" ")[0];
        const newLastName =
          value.lastName || user?.displayName?.split(" ")[1] || "";

        // Ensure no extra spaces are added in case one of the names is missing
        const fullName = `${newFirstName.trim()} ${newLastName.trim()}`.trim();

        // Update Firebase Authentication profile
        await updateUserProfile(fullName);
      }

      console.log(res.data);
    } catch (error) {
      console.error("Error updating profile:", error);
      notification.error({
        message: "Something went wrong",
        description: "Update failed",
        duration: 3,
        placement: "topRight",
      });
    } finally {
      setButtonLoading(false);
    }
  };

  //   const props: UploadProps = {
  //     name: "file",
  //     action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
  //     headers: {
  //       authorization: "authorization-text",
  //     },
  //     onChange(info) {
  //       if (info.file.status !== "uploading") {
  //         console.log(info.file, info.fileList);
  //       }
  //       if (info.file.status === "done") {
  //         message.success(`${info.file.name} file uploaded successfully`);
  //       } else if (info.file.status === "error") {
  //         message.error(`${info.file.name} file upload failed.`);
  //       }
  //     },
  //   };

  //   const onSubmit = async (data: any) => {
  //     console.log(data);
  //     const imageFile = { image: data.image[0] };
  //     const res = await axiosPublic.post(image_hosting_api, imageFile, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });
  //     console.log(res.data);
  //   };
  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setImageFile(e.target.files?.[0] || null);
  // };

  const handleUploadPhoto = async () => {
    setLoading(true);

    try {
      if (imageSelected && fileInputRef.current?.files?.length) {
        const file = fileInputRef.current.files[0];
        if (file) {
          // Ensure file size is below 10MB
          if (file.size < 10 * 1024 * 1024) {
            const formData = new FormData();
            formData.append("file", file); // Use "file" as key
            formData.append("upload_preset", "your_upload_preset"); // Replace with the exact preset name

            // Upload to Cloudinary
            const response = await axiosPublic.post(
              image_hosting_api,
              formData
            );

            const imageUrl = response.data.secure_url; // Correct URL
            console.log("Image URL from Cloudinary:", imageUrl);
            await updateUserAvatar(imageUrl);

            // Handle your backend updates here
            await axiosPublic.put(`/api/v1/user/update-user/${user.email}`, {
              photoURL: imageUrl,
            });
            setImageAvatar(imageUrl);
            setImageSelected(false);
            setFileList([]);
          } else {
            console.log("file size is too large");
          }
        }
      }
    } catch (error: any) {
      console.error(
        "Upload failed:",
        error.response ? error.response.data : error.message
      );
      notification.success({
        message: (
          <p className="font-semibold text-[14px]">Image size is too large</p>
        ),
        description: (
          <p className="text-[12px] text-gray-600">
            Please upload a smaller image.
          </p>
        ),
        duration: 3,
        placement: "topRight",
        showProgress: true,
      });
    } finally {
      setLoading(false);
    }
  };

  // const handleChange = ({ fileList }: any) => {
  //   setFileList(fileList.slice(-1)); // Limit to one file
  // };
  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageAvatar(reader.result);
        setImageSelected(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click(); // Trigger file input click on button click
  };

  const handleCancel = () => {
    setImageSelected(false);
    setImageAvatar(false); // Reset the image selection state
    setImageUrl(null); // Optionally reset the image preview if you want
  };

  return (
    <div className="p-5 pt-0">
      <style>
        {`
          .custom_hover:hover {
            background-color: #35915a !important;
        }

          .ant-form-item {
           margin-bottom: 15px !important;
        }
          .custom_border .ant-select-selector {
           border-color: #7ABA78 !important; 
        }
          
        `}
      </style>

      <div className="">
        <div className="flex relative z-10">
          <div className="relative inline-block">
            <p className="font-semibold text-xl text-[#030712] mb-5">
              Update your profile
            </p>
            <div className="rounded-full flex items-center justify-center !overflow-hidden w-[130px] h-[130px]">
              {imageAvatar ? (
                <Image
                  width={130}
                  height={130}
                  src={imageAvatar}
                  className="rounded-full  !w-[130px] !h-[130px] object-cover object-center"
                />
              ) : loading ? (
                <div className="rounded-full  !w-[130px] !h-[130px] object-cover object-center">
                  <Loader />
                </div>
              ) : (
                <Image
                  width={130}
                  height={130}
                  src={
                    user?.photoURL
                      ? user?.photoURL
                      : "https://github.com/shadcn.png"
                  } // Default avatar if no photoURL
                  className="rounded-full object-cover object-center !w-[130px] !h-[130px]"
                />
              )}
            </div>
            <span className="absolute bottom-[20px] right-[40px] text-sm text-gray-600  px-1 rounded-sm transform translate-x-1/4 translate-y-1/4">
              {/* <Upload
                  listType="picture"
                  maxCount={1}
                  beforeUpload={() => false} // Prevent auto-upload
                  onChange={handleChange}
                  fileList={fileList}
                >
                  <Button icon={<UploadOutlined />}></Button>
                </Upload> */}
              <form onSubmit={handleUploadPhoto}>
                <div>
                  <input
                    ref={fileInputRef}
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                </div>
                <Button
                  className="rounded-full"
                  onClick={handleButtonClick}
                  icon={<UploadOutlined />}
                ></Button>
              </form>
            </span>
          </div>
          <div>
            {imageSelected && (
              <div className="flex items-center justify-center">
                <Button
                  disabled={loading}
                  loading={loading}
                  className="custom_hover ml-5 mr-2 text-sm font-semibold px-4 border-none shadow-none !bg-secondary-color !text-white"
                  type="primary"
                  onClick={handleUploadPhoto}
                  // loading={loading}
                >
                  {loading ? "Uploading avatar" : " Upload Avatar"}
                </Button>
                <Button
                  onClick={handleCancel}
                  className="border-none"
                  icon={<RxCross1 className="w-8 h-8" />}
                ></Button>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center justify-center flex-col sm:flex-row max-sm:gap-5 sm:justify-between mb-5 mt-5">
          <div className="block">
            <div className="flex lg:flex-row flex-col items-center gap-y-2 lg:gap-x-4">
              <h3 className="font-manrope font-bold text-2xl text-[#030712] max-sm:text-center">
                {user?.displayName}
              </h3>
              <a className="rounded-full py-2 px-4 bg-stone-100 text-gray-700 font-semibold text-sm leading-6 transition-all duration-500 hover:bg-stone-200 hover:text-gray-900">
                Teacher
              </a>
            </div>
            <p className="font-normal text-sm text-gray-500  max-sm:text-center">
              email: {user?.email}
            </p>
          </div>
          {/* <button className="py-3.5 px-5 flex rounded-full bg-indigo-600 items-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-700">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.3011 8.69881L8.17808 11.8219M8.62402 12.5906L8.79264 12.8819C10.3882 15.6378 11.1859 17.0157 12.2575 16.9066C13.3291 16.7974 13.8326 15.2869 14.8397 12.2658L16.2842 7.93214C17.2041 5.17249 17.6641 3.79266 16.9357 3.0643C16.2073 2.33594 14.8275 2.79588 12.0679 3.71577L7.73416 5.16033C4.71311 6.16735 3.20259 6.67086 3.09342 7.74246C2.98425 8.81406 4.36221 9.61183 7.11813 11.2074L7.40938 11.376C7.79182 11.5974 7.98303 11.7081 8.13747 11.8625C8.29191 12.017 8.40261 12.2082 8.62402 12.5906Z"
                  stroke="white"
                  stroke-width="1.6"
                  stroke-linecap="round"
                />
              </svg>
              <span className="px-2 font-semibold text-base leading-7 text-white">
                Send Message
              </span>
            </button> */}
        </div>
        {/* <div className="flex max-sm:flex-wrap max-sm:justify-center items-center gap-4">
            <a
              href="javascript:;"
              className="rounded-full py-3 px-6 bg-stone-100 text-gray-700 font-semibold text-sm leading-6 transition-all duration-500 hover:bg-stone-200 hover:text-gray-900"
            >
              Ux Research
            </a>
            <a
              href="javascript:;"
              className="rounded-full py-3 px-6 bg-stone-100 text-gray-700 font-semibold text-sm leading-6 transition-all duration-500 hover:bg-stone-200 hover:text-gray-900"
            >
              CX Strategy
            </a>
            <a
              href="javascript:;"
              className="rounded-full py-3 px-6 bg-stone-100 text-gray-700 font-semibold text-sm leading-6 transition-all duration-500 hover:bg-stone-200 hover:text-gray-900"
            >
              Project Manager
            </a>
          </div> */}
        <div className="">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleUpdate}
            style={{ maxWidth: 600 }}
            initialValues={{
              firstName: currentUser?.firstName || "",
              lastName: currentUser?.lastName || "",
              gender: currentUser?.gender || "",
              contactNo: currentUser?.contactNo || "",
              role: currentUser?.role || "",
            }}
          >
            <Form.Item
              label={
                <p className="block text-sm font-medium text-gray-700">
                  First name
                </p>
              }
              name="firstName"
            >
              <Input className="shadow-sm h-[36px] w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 focus:border-primary-color" />
            </Form.Item>
            <Form.Item
              label={
                <p className="block text-sm font-medium text-gray-700">
                  last name
                </p>
              }
              name="lastName"
            >
              <Input className="shadow-sm h-[36px] w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 focus:border-primary-color" />
            </Form.Item>

            <Form.Item
              label={
                <p className="block text-sm font-medium text-gray-700">
                  Gender
                </p>
              }
              name="gender"
            >
              <Select
                defaultValue={user?.gender || undefined}
                className="shadow-sm h-[36px] w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 focus:border-primary-color"
              >
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label={
                <p className="block text-sm font-medium text-gray-700">
                  Contact Number
                </p>
              }
              name="contactNo"
            >
              <Input
                type="Number"
                className="shadow-sm h-[36px] w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 focus:border-primary-color"
              />
            </Form.Item>

            <Form.Item
              label={
                <p className="block text-sm font-medium text-gray-700">Role</p>
              }
              name="role"
            >
              <Select
                defaultValue={user?.role || undefined}
                className="custom_border shadow-sm h-[36px] w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 focus:border-primary-color"
              >
                <Option value="student">Student</Option>
                <Option value="teacher">Teacher</Option>
              </Select>
            </Form.Item>

            <div className="mt-10 flex items-end justify-end">
              <Button
                className="custom_button_style custom_hover"
                type="primary"
                htmlType="submit"
                loading={buttonLoading}
              >
                {buttonLoading ? "Saving" : "Save changes"}
              </Button>
            </div>
          </Form>
        </div>
      </div>

      {/* <img src={user?.photoURL} alt="" /> */}

      {/* <div>
        <form onSubmit={handleUploadPhoto}>
          <div>
            <input
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange} // Add onChange to set imageFile
            />
          </div>
          <button type="submit">upload avatar</button>
        </form>
      </div> */}
      {/* <div className="relative">
        <Avatar
          src={user?.photoURL}
          size={100}
          icon={!user?.photoURL && <UploadOutlined />}
          shape="circle"
          className="border border-gray-300"
        />
      </div> */}
    </div>
  );
};

export default UpdateProfile;
