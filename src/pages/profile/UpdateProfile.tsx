/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useContext, useRef } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  notification,
  Upload,
  Avatar,
  Image,
} from "antd";
import useAxios from "../../hooks/useAxios";
import { AuthContext } from "../../providers/AuthProvider";
import { UploadOutlined } from "@ant-design/icons";
import { RxCross1 } from "react-icons/rx";
import Loader from "../../common/Loader";
const { Option } = Select;

interface UserData {
  firstName: string;
  lastName: string;
  gender: "male" | "female";
  contactNo: string;
  avatar: string;
  image: any;
}

const UpdateProfile: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileList, setFileList] = useState<any[]>([]);
  const [imageUrl, setImageUrl] = useState(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imageSelected, setImageSelected] = useState(false);
  //   const [imageUrl, setImageUrl] = useState<string>();
  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?expiration=600&key=${image_hosting_key}`;
  //   const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const axiosPublic = useAxios();
  const {
    user,
    updateUserProfile,
    updateUserAvatar,
    loading,
    setLoading,
  }: any = useContext(AuthContext);
  const src =
    "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png";
  const [imageAvatar, setImageAvatar] = useState(user?.photoURL);
  // const handleUpdate = async (value: UserData) => {
  //   setLoading(true);

  //   // Prepare the MongoDB update payload
  //   const updateProfileValues: any = {};
  //   if (value.firstName) updateProfileValues.firstName = value.firstName;
  //   if (value.lastName) updateProfileValues.lastName = value.lastName;
  //   if (value.gender) updateProfileValues.gender = value.gender;
  //   if (value.contactNo) updateProfileValues.contactNo = value.contactNo;

  //   try {
  //     // Update user in MongoDB
  //     const res = await axiosPublic.put(
  //       `/api/v1/user/update-user/${user?.email}`,
  //       updateProfileValues
  //     );

  //     notification.success({
  //       message: "Update success",
  //       description: "User updated successfully in MongoDB",
  //       duration: 3,
  //       placement: "topRight",
  //     });

  //     // Set displayName to reflect both existing and updated names
  //     if (value.firstName || value.lastName) {
  //       // Set displayName to reflect both existing and updated names
  //       const newFirstName =
  //         value.firstName || user?.displayName?.split(" ")[0];
  //       const newLastName =
  //         value.lastName || user?.displayName?.split(" ")[1] || "";

  //       // Ensure no extra spaces are added in case one of the names is missing
  //       const fullName = `${newFirstName.trim()} ${newLastName.trim()}`.trim();

  //       // Update Firebase Authentication profile
  //       await updateUserProfile(fullName);
  //     }

  //     console.log(res.data);
  //   } catch (error) {
  //     console.error("Error updating profile:", error);
  //     notification.error({
  //       message: "Something went wrong",
  //       description: "Update failed",
  //       duration: 3,
  //       placement: "topRight",
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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
    // if (!fileList.length || !user) return;
    // const imageFile = fileList[0];
    // if (!fileList.length || !user) return;
    // const imageFile = fileList[0];
    setLoading(true);

    try {
      if (imageSelected && fileInputRef.current?.files?.length) {
        const file = fileInputRef.current.files[0];
        if (file) {
          // Upload image to ImageBB
          const formData = new FormData();
          formData.append("image", file);
          const response = await axiosPublic.post(
            `https://api.cloudinary.com/v1_1/deej2hp71/image/upload`,
            formData
          );

          const imageUrl = response.data.data.display_url;
          console.log("Image URL from cloudinery:", imageUrl);

          // Update Firebase user profile
          await updateUserAvatar(imageUrl);

          // Update your backend database
          await axiosPublic.put(`/api/v1/user/update-user/${user.email}`, {
            photoURL: imageUrl,
          });
          setImageAvatar(response.data.cover);
          setImageSelected(false);
          setFileList([]);
        }
      }
    } catch (error: any) {
      console.group(error);
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
    <>
      <style>
        {`
          .custom_hover:hover {
            background-color: #35915a !important;
          }
        `}
      </style>
      <section className="relative pt-40 pb-24">
        <img
          src="https://pagedone.io/asset/uploads/1705473908.png"
          alt="cover-image"
          className="w-full absolute top-0 left-0 z-0  h-60 object-cover"
        />
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex items-center justify-center sm:justify-start relative z-10 mb-5">
            <div className="relative inline-block">
              <div className="bg-white rounded-full flex items-center justify-center overflow-hidden">
                {imageAvatar ? (
                  <Image
                    width={200}
                    height={200}
                    src={imageAvatar}
                    className="border-4 border-solid border-white rounded-full object-cover !w-[200px] h-[200px]"
                  />
                ) : loading ? (
                  <div className="border-4 border-solid border-white rounded-full object-cover !w-[200px] h-[200px]">
                    <Loader />
                  </div>
                ) : (
                  <Image
                    width={200}
                    height={200}
                    src={
                      user?.photoURL
                        ? user?.photoURL
                        : "https://github.com/shadcn.png"
                    } // Default avatar if no photoURL
                    className="border-4 border-solid border-white rounded-full object-cover !w-[200px] h-[200px]"
                  />
                )}
              </div>
              <span className="absolute bottom-[25px] right-[20px] text-sm text-gray-600  px-1 rounded-sm transform translate-x-1/4 translate-y-1/4">
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
                    className="custom_hover ml-5 mr-2 text-sm font-semibold h-[40px] px-8 border-none shadow-none !bg-secondary-color !text-white"
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
          <div className="flex items-center justify-center flex-col sm:flex-row max-sm:gap-5 sm:justify-between mb-5">
            <div className="block">
              <h3 className="font-manrope font-bold text-4xl text-gray-900 mb-1 max-sm:text-center">
                {user?.displayName}
              </h3>
              <p className="font-normal text-base leading-7 text-gray-500  max-sm:text-center">
                {user?.email}
              </p>
            </div>
            <button className="py-3.5 px-5 flex rounded-full bg-indigo-600 items-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-700">
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
            </button>
          </div>
          <div className="flex max-sm:flex-wrap max-sm:justify-center items-center gap-4">
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
          </div>
        </div>
      </section>
      {/* <Form
        layout="vertical"
        onFinish={handleUpdate}
        style={{ maxWidth: 600, margin: "0 auto" }}
      >
        <Form.Item name="firstName" label="First Name">
          <Input />
        </Form.Item>
        <Form.Item name="lastName" label="Last Name">
          <Input />
        </Form.Item>

        <Form.Item name="gender" label="Gender">
          <Select>
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
          </Select>
        </Form.Item>

        <Form.Item name="contactNo" label="Contact Number">
          <Input />
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={loading}>
          {loading ? "updating profile" : "Update Profile"}
        </Button>
      </Form> */}
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
    </>
  );
};

export default UpdateProfile;
