import { Input } from "antd";
import CustomButton from "../common/CustomButton";
import banner from "../assets/images/pattern.jpg";
import icon from "../assets/icons/acadizo_logo.png";
const Home = () => {
  return (
    <div>
      <section className="bg-white rounded-xl">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12 rounded-xl p-2 ">
          <aside className="relative block h-16 lg:col-span-5 lg:h-full xl:col-span-6 rounded-xl">
            <img
              alt=""
              src={banner}
              className="absolute inset-0 h-full w-full object-cover rounded-l-xl"
            />
          </aside>
          <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6 bg-[#F5F5F7] rounded-r-xl">
            <div className="max-w-xl lg:max-w-3xl">
              <img className="w-32" src={icon} alt="" />

              <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Welcome to <span className="text-primary-color">Acadizo</span>
              </h1>

              <p className="mt-4 leading-relaxed text-gray-500">
                Uniting Education Through Simplicity, Empowering Students and
                Teachers for a Seamless Learning Experience.
              </p>

              <form action="#" className="mt-8 grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="FirstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First Name
                  </label>

                  <Input
                    type="text"
                    id="FirstName"
                    name="first_name"
                    className="mt-1 h-[36px] w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 focus:border-primary-color"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="LastName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>

                  <Input
                    type="text"
                    id="LastName"
                    name="last_name"
                    className="mt-1 h-[36px] w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 focus:border-primary-color"
                  />
                </div>

                <div className="col-span-6">
                  <label
                    htmlFor="Email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {" "}
                    Email{" "}
                  </label>

                  <Input
                    type="email"
                    id="Email"
                    name="email"
                    className="mt-1 h-[36px] w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 focus:border-primary-color"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label className="block text-sm font-medium text-gray-700">
                    {" "}
                    Password{" "}
                  </label>

                  <Input.Password
                    name="password"
                    className="mt-1 h-[36px] w-full rounded-md focus:border-primary-color outline-none text-sm text-gray-700"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Password Confirmation
                  </label>

                  <Input.Password
                    name="password_confirmation"
                    className="mt-1 h-[36px] w-full rounded-md focus:border-primary-color outline-none text-sm text-gray-700"
                  />
                </div>

                {/* <div className="col-span-6">
                  <label htmlFor="MarketingAccept" className="flex gap-4">
                    <input
                      type="checkbox"
                      id="MarketingAccept"
                      name="marketing_accept"
                      className="size-5 rounded-md border-gray-200 bg-white shadow-sm"
                    />

                    <span className="text-sm text-gray-700">
                      I want to receive emails about events, product updates and
                      company announcements.
                    </span>
                  </label>
                </div> */}

                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <CustomButton buttonText="Create an account" />

                  <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                    Already have an account?
                    <a href="#" className="text-primary-color underline ml-2">
                      Log in
                    </a>
                    .
                  </p>
                </div>
              </form>
            </div>
          </main>
        </div>
      </section>
    </div>
  );
};

export default Home;
