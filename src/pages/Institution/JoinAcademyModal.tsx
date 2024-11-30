/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, List, Modal } from "antd";
import Loader from "../../common/Loader";

const JoinAcademyModal = ({
  academyModal,
  setAcademyModal,
  searchItem,
  handleSearch,
  isListLoading,
  loading,
  currentUserEmail,
  isPending,
  academyLists,
  handleJoinAcademy,
}: any) => {
  const getJoinButton = (academy: any) => {
    const isUserEmailIncluded = academy?.academyMembers?.some(
      (member: any) => member?.email === currentUserEmail
    );

    return (
      //   <Button
      //     disabled={isListLoading || isPending || isUserEmailIncluded}
      //     className={
      //       isUserEmailIncluded
      //         ? "text-sm font-semibold h-[30px] px-6 shadow-none text-secondary-color bg-transparent border"
      //         : "text-sm font-semibold h-[30px] px-6 shadow-none text-secondary-color bg-transparent border custom_hover_second  !border-primary-color"
      //     }
      //     onClick={() =>
      //       !isUserEmailIncluded && handleJoinAcademy(academy?.academyName)
      //     }
      //   >
      //     {isListLoading || isPending
      //       ? "joining.."
      //       : isUserEmailIncluded || isPending
      //       ? "Joined"
      //       : "Join"}
      //   </Button>

      <>
        {isListLoading && isPending ? (
          <>
            <Button
              disabled={isListLoading || isPending || isUserEmailIncluded}
              className={
                isUserEmailIncluded
                  ? "text-sm font-semibold h-[30px] px-6 shadow-none text-secondary-color bg-transparent border"
                  : "text-sm font-semibold h-[30px] px-6 shadow-none text-secondary-color bg-transparent border custom_hover_second  !border-primary-color"
              }
            >
              joining..
            </Button>
          </>
        ) : isUserEmailIncluded ? (
          <>
            <Button
              disabled={isListLoading || isPending || isUserEmailIncluded}
              className={`text-sm font-semibold h-[30px] px-6 shadow-none text-secondary-color bg-transparent border`}
            >
              Joined
            </Button>
          </>
        ) : (
          <>
            <Button
              disabled={isListLoading || isPending || isUserEmailIncluded}
              className={`text-sm font-semibold h-[30px] px-6 shadow-none text-secondary-color bg-transparent border custom_hover_second  !border-primary-color`}
              onClick={() =>
                !isUserEmailIncluded && handleJoinAcademy(academy?.academyName)
              }
            >
              Join
            </Button>
          </>
        )}
      </>
    );
  };

  return (
    <div>
      <Modal
        footer={null}
        title="Choose & select or join your academy"
        centered
        open={academyModal}
        onOk={() => setAcademyModal(false)}
        onCancel={() => setAcademyModal(false)}
      >
        <div className="">
          <div className="relative my-5">
            <input
              placeholder="Search academy by name"
              value={searchItem}
              onChange={handleSearch}
              className="w-full input rounded-[12px] px-6 py-3 border focus:outline-none focus:border-primary-color placeholder-gray-400 transition-all duration-300 border-gray-200 placeholder:text-sm"
              type="text"
            />
            <button className="absolute right-3 -translate-y-1/2 top-1/2 p-1">
              <svg
                width="17"
                height="16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-labelledby="search"
                className="w-5 h-5 text-gray-700"
              >
                <path
                  d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
                  stroke="currentColor"
                  stroke-width="1.333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </button>
          </div>
          {/* <Input
            placeholder="Search academy by name"
            value={searchItem}
            onChange={handleSearch}
            style={{ marginBottom: 20, width: "300px" }}
          /> */}
          {isListLoading ? (
            <Loader />
          ) : (
            <List
              className="max-h-[50vh] min-h-[50vh] overflow-y-scroll scroll-smooth"
              loading={loading}
              dataSource={academyLists?.filter(
                (academy: any) =>
                  academy?.academyName &&
                  academy?.academyName
                    .toLowerCase()
                    .includes(searchItem?.toLowerCase())
              )}
              renderItem={(academy: any) => (
                <List.Item actions={[getJoinButton(academy)]}>
                  <List.Item.Meta
                    title={
                      <p className="font-semibold">{academy.academyName}</p>
                    }
                    description={
                      <p className="text-sm">{academy.academyDescription}</p>
                    }
                  />
                </List.Item>
              )}
            />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default JoinAcademyModal;
