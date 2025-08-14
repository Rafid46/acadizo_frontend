/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck

import { useContext, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Link, NavLink } from "react-router-dom";
import { Avatar, Button, Dropdown, MenuProps } from "antd";
import { Github, Grid2x2Check, Menu, X } from "lucide-react";
import logo from "../../assets/icons/acadizo_logo.png";
import { motion } from "framer-motion";
import { ReactNode } from "react";
// import { useScroll, useTransform } from "framer-motion";
import { HiArrowLongRight } from "react-icons/hi2";
import { Brain, Cloud, Shield, Zap } from "lucide-react";
import MagicBento from "../../Components/ui/MagicBento/MagicBento";
import { CountUpText } from "../../common/CountupText";
import FloatingPaper from "./FloatingPaper";
import RoboAnimation from "./Robo-Animation";
import Sparkles from "./Sparkles";
import TextType from "../../common/TextType";
import { BsTwitter } from "react-icons/bs";
import { LiaLinkedinIn } from "react-icons/lia";
import { LuHome, LuLogOut } from "react-icons/lu";
import { AuthContext } from "../../providers/AuthProvider";
import { FaAngleDown } from "react-icons/fa";
import { Marquee } from "../../Components/magicui/Marquee";
import { cn } from "../../lib/utils";
// interface HeaderProps {
//   navigationItems: any;
// }

const Homepage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { logOut, loading, user }: any = useContext(AuthContext);
  console.log(user, "user from home");
  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };
  const navigationItems = [
    { label: "Features", href: "#features" },
    { label: "About Us", href: "#about" },
    // { label: "Pricing", href: "#pricing" },
    // { label: "Blog", href: "#blog" },
    { label: "Contact", href: "#contact" },
  ];

  const IMG_PADDING = 12;

  const TextParallaxContent = ({
    // imgUrl,
    // subheading,
    // heading,
    children,
  }: {
    imgUrl: string;
    subheading: string;
    heading: string;
    children: ReactNode;
  }) => {
    return (
      <div
        className=""
        style={{
          paddingLeft: IMG_PADDING,
          paddingRight: IMG_PADDING,
          paddingTop: 70,
        }}
      >
        <div className="">
          {/* <StickyImage imgUrl={imgUrl} /> */}
          <main className="min-h-screen  antialiased bg-grid-white/[0.02] relative overflow-hidden">
            {/* Ambient background with moving particles */}
            <div className="h-full w-full absolute inset-0 z-0">
              <Sparkles
                id="tsparticlesfullpage"
                background="transparent"
                minSize={0.6}
                maxSize={1.4}
                particleDensity={100}
                className="w-full h-full"
                particleColor="#000000"
              />
            </div>

            <div className="relative z-10">
              <div className="relative min-h-[calc(100vh-76px)] flex items-center">
                {/* Floating papers background */}
                <div className="absolute inset-0 overflow-hidden">
                  <FloatingPaper count={6} />
                </div>

                <div className="container mx-auto px-6 relative z-10">
                  <div className="mx-auto text-center">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold  mb-6">
                        Empowering Education Through <br /> Seamless Connection{" "}
                        <br />
                        <span className="">
                          <TextType
                            text={["by Acadizo"]}
                            typingSpeed={75}
                            pauseDuration={1500}
                            showCursor={true}
                            cursorCharacter="_"
                            textColors="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
                          />
                        </span>
                      </h1>
                    </motion.div>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="text-gray-400 text-xl mb-8 max-w-2xl mx-auto"
                    >
                      Upload your research papers and let our AI transform them
                      into engaging presentations, podcasts, and visual content.
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                      <Link to="/dashboard">
                        <Button
                          type="primary"
                          className="custom_button_style custom_hover !h-[42px] !px-[28px] mr-4"
                        >
                          Explore Solutions
                          {/* <ArrowRight className="ml-2 h-4 w-4" /> */}
                        </Button>
                      </Link>
                      <div className="">
                        <a href="#" className="batton type--C">
                          <span className="batton__text  text-[12px]">
                            Learn more <HiArrowLongRight className="!text-lg" />
                          </span>
                          <div className="batton__drow1"></div>
                          <div className="batton__drow2"></div>
                        </a>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Animated robot */}
                <div className="absolute bottom-0 right-0 w-96 h-96">
                  <RoboAnimation />
                </div>
              </div>
            </div>
          </main>
          {/* <OverlayCopy heading={heading} subheading={subheading} />
          <OverlayButton /> */}
        </div>
        {children}
      </div>
    );
  };

  // const StickyImage = ({ imgUrl }: { imgUrl: string }) => {
  //   const targetRef = useRef(null);
  //   const { scrollYProgress } = useScroll({
  //     target: targetRef,
  //     offset: ["end end", "end start"],
  //   });

  //   const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  //   const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  //   return (
  //     <motion.div
  //       style={{
  //         backgroundImage: `url(${imgUrl})`,
  //         backgroundSize: "cover",
  //         backgroundPosition: "center",
  //         height: `calc(100vh - ${IMG_PADDING * 2}px)`,
  //         top: IMG_PADDING,
  //         scale,
  //       }}
  //       ref={targetRef}
  //       className="sticky  overflow-hidden rounded-xl"
  //     >
  //       <motion.div
  //         className="absolute inset-0 bg-neutral-950/70"
  //         style={{
  //           opacity,
  //         }}
  //       />
  //     </motion.div>
  //   );
  // };

  // const OverlayCopy = ({
  //   subheading,
  //   heading,
  // }: {
  //   subheading: string;
  //   heading: string;
  // }) => {
  //   const targetRef = useRef(null);
  //   const { scrollYProgress } = useScroll({
  //     target: targetRef,
  //     offset: ["start end", "end start"],
  //   });

  //   const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  //   const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  //   return (
  //     <motion.div
  //       style={{
  //         y,
  //         opacity,
  //       }}
  //       ref={targetRef}
  //       className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white"
  //     >
  //       <p className="mb-2 text-center text-xl md:mb-4 md:text-3xl">
  //         {subheading}
  //       </p>
  //       <p className="text-center text-4xl font-bold md:text-7xl">{heading}</p>
  //     </motion.div>
  //   );
  // };
  // const OverlayButton = () => {
  //   const targetRef = useRef(null);
  //   const { scrollYProgress } = useScroll({
  //     target: targetRef,
  //     offset: ["start end", "end start"],
  //   });

  //   const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  //   const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  //   return (
  //     <motion.div
  //       // style={{
  //       //   y,
  //       //   opacity,
  //       // }}
  //       ref={targetRef}
  //       className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white mt-[150px]"
  //     >
  //       <div className="flex gap-4">
  //         <Button
  //           type="primary"
  //           className="custom_button_style custom_hover !h-[42px] !px-[28px] mr-4"
  //         >
  //           Explore Solutions
  //           {/* <ArrowRight className="ml-2 h-4 w-4" /> */}
  //         </Button>
  //         <div className="container">
  //           <a href="#" className="batton type--C">
  //             <span className="batton__text !text-white text-[12px]">
  //               Learn more <HiArrowLongRight className="!text-lg" />
  //             </span>
  //             <div className="batton__drow1"></div>
  //             <div className="batton__drow2"></div>
  //           </a>
  //         </div>
  //       </div>
  //     </motion.div>
  //   );
  // };

  const features = [
    {
      name: "Real-Time Notifications",
      description:
        "Instant alerts for assignments, feedback, and announcements keep students and teachers always in sync.",
      icon: Brain,
    },
    {
      name: "Seamless Class Management",
      description:
        "Organize classes, track attendance, and manage activities — all from one clean dashboard.",
      icon: Cloud,
    },
    {
      name: "Secure Data & User Roles",
      description:
        "Robust access controls and encryption protect sensitive student and teacher data. Every action is logged, every role respected.",
      icon: Shield,
    },
    {
      name: "High-Performance Systems",
      description:
        "Optimized for speed and efficiency, our solutions deliver unparalleled performance.",
      icon: Zap,
    },
  ];
  const handleLogout = () => {
    logOut()
      .then(() => {
        // console.log(res.data);
        console.log("logged out");
      })
      .catch((error: any) => {
        console.log(error);
      });
  };
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <Link to="/dashboard/update-profile">My Account</Link>,
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: <Link to="/dashboard/">Dashboard</Link>,
      icon: <LuHome />,
    },
    {
      type: "divider",
    },

    {
      key: "4",
      label: "Logout",
      icon: <LuLogOut />,
      onClick: handleLogout,
    },
  ];

  const reviews = [
    {
      name: "Jack",
      username: "@jack",
      body: "I've never seen anything like this before. It's amazing. I love it.",
      img: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    },
    {
      name: "Jill",
      username: "@jill",
      body: "I don't know what to say. I'm speechless. This is amazing.",
      img: "https://avatar.vercel.sh/jill",
    },
    {
      name: "John",
      username: "@john",
      body: "I'm at a loss for words. This is amazing. I love it.",
      img: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    },
    {
      name: "Jane",
      username: "@jane",
      body: "I'm at a loss for words. This is amazing. I love it.",
      img: "https://avatar.vercel.sh/jane",
    },
    {
      name: "Jenny",
      username: "@jenny",
      body: "I'm at a loss for words. This is amazing. I love it.",
      img: "https://avatar.vercel.sh/jenny",
    },
    {
      name: "James",
      username: "@james",
      body: "I'm at a loss for words. This is amazing. I love it.",
      img: "https://avatar.vercel.sh/james",
    },
  ];

  const firstRow = reviews.slice(0, reviews.length / 2);
  const secondRow = reviews.slice(reviews.length / 2);

  const ReviewCard = ({
    img,
    name,
    username,
    body,
    className,
  }: ReviewCardProps) => {
    return (
      <figure
        className={cn(
          "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
          "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
          "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
          className // allow parent to override or extend
        )}
      >
        <div className="flex flex-row items-center gap-2">
          <img
            className="rounded-full"
            width="32"
            height="32"
            alt=""
            src={img}
          />
          <div className="flex flex-col">
            <figcaption className="text-sm font-medium dark:text-white">
              {name}
            </figcaption>
            <p className="text-xs font-medium dark:text-white/40">{username}</p>
          </div>
        </div>
        <blockquote className="mt-2 text-sm">{body}</blockquote>
      </figure>
    );
  };
  return (
    <div className="animated-background">
      <style>
        {` 
        .ant-dropdown .ant-dropdown-menu .ant-dropdown-menu-item {
         padding: 10px 24px;

    }
        .ant-dropdown-menu-title-content {
         color: #64748b !important;
         font-size: 12px;
         font-weight: 600 !important;
    }

        .hover-button {
         transition: background-color 0.3s ease, opacity 0.3s ease;
    }

        .hover-button:hover {
         opacity: 0.9;
    }
    `}
      </style>
      {/* header */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full  bg-white backdrop-blur  transition-all duration-300 shadow-sm">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6 mx-auto">
          <NavLink to="" className="flex items-center space-x-2 group">
            {/* <GraduationCap className="h-8 w-8 text-green-600 transition-transform duration-300 group-hover:rotate-12" /> */}

            <span className="text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-green-600">
              <img className="w-32" src={logo} alt="" />
            </span>
          </NavLink>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item: any, index: any) => (
              <NavLink
                onClick={(e) => {
                  if (item.href.startsWith("#")) {
                    e.preventDefault();
                    const target = document.querySelector(item.href);
                    target?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                key={item.label}
                to={item.href}
                className="text-sm font-medium text-gray-600 hover:text-green-600 transition-all duration-300 relative group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-full" />
              </NavLink>
            ))}
          </nav>
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <Dropdown
                className="cursor-pointer"
                trigger={["click", "hover"]}
                menu={{ items }}
              >
                <a className="px-6">
                  {loading ? (
                    <div className="flex items-center gap-x-2">
                      <Avatar src="" size={40} className="bg-gray-200" />
                      <div className="flex flex-col gap-y-2">
                        <p className="bg-gray-200 w-[100px] h-[10px] rounded-[10px]"></p>
                        <p className="bg-gray-200 w-[80px] h-[10px] rounded-[10px]"></p>
                      </div>
                      <FaAngleDown className="ml-2 text-text-secondary-color" />
                    </div>
                  ) : (
                    <div className="flex items-center gap-x-2">
                      <Avatar
                        src={user?.photoURL}
                        size={40}
                        icon={<UserOutlined />}
                      />
                      <div className="flex flex-col">
                        <p className="text-sm font-medium text-text-color">
                          {user?.displayName}
                        </p>
                        <p className="text-text-small font-normal text-text-secondary-color">
                          {user?.email}
                        </p>
                      </div>
                      <FaAngleDown className="ml-2 text-text-secondary-color" />
                    </div>
                  )}
                </a>
              </Dropdown>
            ) : (
              <Link to="/login">
                <Button
                  type="link"
                  className="!text-primary-color hover:text-green-600 transition-all duration-300 hover:scale-105 font-semibold"
                >
                  Sign In
                </Button>
              </Link>
            )}

            {!user && (
              <Link to="/login">
                <Button className="custom_button_style_secondary !rounded-full custom_hover px-6 py-3">
                  Get Started
                </Button>
              </Link>
            )}
          </div>
          {/* Mobile Menu Button */}
          <button
            className="md:hidden transition-transform duration-300 hover:scale-110"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <div
              className={`transition-transform duration-300 ${
                isMenuOpen ? "rotate-180" : ""
              }`}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </div>
          </button>
        </div>
        {/* Mobile Navigation */}
        <div
          className={`md:hidden border-t bg-white transition-all duration-300 ${
            isMenuOpen
              ? "max-h-96 opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <nav className="flex flex-col space-y-4 p-4">
            {navigationItems.map((item: any, index: any) => (
              <NavLink
                key={item.label}
                to={item.href}
                className="text-sm font-medium text-gray-600 transition-all duration-300 hover:text-green-600 hover:translate-x-2"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
            <div className="flex flex-col space-y-2 pt-4 border-t">
              <Button
                type="link"
                className="!text-primary-color hover:text-green-600 transition-all duration-300 hover:scale-105 font-semibold"
              >
                Sign In
              </Button>
              <Button className="custom_button_style custom_hover">
                Get Started
              </Button>
            </div>
          </nav>
        </div>
      </header>
      {/* hero */}
      <div className="">
        <TextParallaxContent
          imgUrl="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          subheading="Collaborate"
          heading=""
        >
          {/* feature */}
          <section id="features" className="space-y-16 py-24 md:py-32">
            <div className="mx-auto max-w-[58rem] text-center">
              <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
                Cutting-Edge Solutions
              </h2>
              <p className="mt-4 text-muted-foreground sm:text-lg">
                Empowering teachers and students through intuitive, seamless,
                and smart learning technology.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
              {features.map((feature) => (
                <div
                  key={feature.name}
                  className="relative overflow-hidden rounded-lg border bg-background p-8"
                >
                  <div className="flex items-center gap-4">
                    <feature.icon className="h-8 w-8" />
                    <h3 className="font-bold">{feature.name}</h3>
                  </div>
                  <p className="mt-2 text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </TextParallaxContent>
        {/* <TextParallaxContent
          imgUrl="https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          subheading="Quality"
          heading="Never compromise."
        >
          <ExampleContent />
        </TextParallaxContent>
        <TextParallaxContent
          imgUrl="https://images.unsplash.com/photo-1504610926078-a1611febcad3?q=80&w=2416&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          subheading="Modern"
          heading="Dress for the best."
        >
          <ExampleContent />
        </TextParallaxContent> */}
      </div>
      {/* bento */}
      <div className="mb-6">
        <h2 className="font-semibold text-3xl leading-[1.1] sm:text-3xl md:text-5xl flex-col flex items-center justify-center mb-2">
          <div className="rounded-3xl bg-purple-500 w-fit p-5 shadow-md">
            <Grid2x2Check className="text-md text-white" />
          </div>
          All in one place
        </h2>

        <MagicBento />
        <p className="text-center font-medium text-gray-700">
          and a lot of comforts.....
        </p>
      </div>

      <div className="relative z-10 flex flex-col divide-y divide-[--border] pt-[35px] dark:divide-[--dark-border]">
        {/* Avatar Section */}
        <div className="flex flex-col items-center justify-end">
          <div className="flex items-center gap-2 border border-b-0 border-[--border] px-4 py-2 dark:border-[--dark-border]">
            <div className="flex -space-x-3 rtl:space-x-reverse">
              {[
                "https://assets.basehub.com/fa068a12/6sGiFfUGTaMBQFStD16V5/figma-image-500x500.png?height=100&quality=100&width=100",
                "https://assets.basehub.com/fa068a12/XdbZC6Y1mPpNarRwWXWGs/103cd669723f80c168b5d84ec8bbe0a5.png?height=100&quality=100&width=100",
                "https://assets.basehub.com/fa068a12/eXjW9QO3AKz15Ru0lRyaL/97a514e9e8c98d647f06c12400f1f0bd-(1).png?height=100&quality=100&width=100",
              ].map((src, i) => (
                <img
                  key={i}
                  alt={`Avatar ${i + 1}`}
                  width="28"
                  height="28"
                  className="size-7 shrink-0 rounded-full border-2 border-[--surface-primary] object-cover dark:border-[--dark-surface-primary]"
                  src={src}
                />
              ))}
            </div>
            <p className="text-sm tracking-tight text-[--text-tertiary] dark:text-[--dark-text-tertiary]">
              1,254 happy customers
            </p>
          </div>
        </div>

        {/* Hero Section */}
        <div>
          <div className="mx-auto flex min-h-[288px] max-w-[80vw] flex-col items-center justify-center gap-2 px-2 py-4 sm:px-16 lg:px-24">
            <h1 className="max-w-screen-lg text-pretty text-center text-[clamp(32px,7vw,64px)] font-medium leading-none tracking-[-1.44px] text-[--text-primary] dark:text-[--dark-text-primary] md:tracking-[-2.16px]">
              Streamlined Communication for Iterating Fast
            </h1>
            <h2 className="text-md max-w-2xl text-center text-[--text-tertiary] dark:text-[--dark-text-tertiary] md:text-lg">
              Acme is an installable, self-hosted team chat system. You can have
              several paragraphs in here and the thing will wrap gracefully.
            </h2>
          </div>
        </div>
      </div>
      <div className="relative max-w-screen-lg mx-auto overflow-hidden bg-white">
        {/* gradient overlays */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

        {/* marquee content */}
        <Marquee pauseOnHover className="[--duration:20s] ">
          {firstRow.map((review) => (
            <ReviewCard
              className="!border !border-gray-200 bg-gray-100"
              {...review}
            />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]">
          {secondRow.map((review) => (
            <ReviewCard
              className="!border !border-gray-200 bg-gray-100"
              {...review}
            />
          ))}
        </Marquee>
      </div>
      {/* about us */}
      <section id="about" className="py-24 relative xl:mr-0 lg:mr-5 mr-0">
        <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
          <div className="w-full justify-start items-center xl:gap-12 gap-10 grid lg:grid-cols-2 grid-cols-1">
            <div className="w-full flex-col justify-center lg:items-start items-center gap-10 inline-flex">
              <div className="w-full flex-col justify-center items-start gap-8 flex">
                <div className="flex-col justify-start lg:items-start items-center gap-4 flex">
                  <h6 className="text-gray-400 text-base font-normal leading-relaxed">
                    About Us
                  </h6>
                  <div className="w-full flex-col justify-start lg:items-start items-center gap-3 flex">
                    <h2 className="text-indigo-700 text-4xl font-bold font-manrope leading-normal lg:text-start text-center">
                      The Tale of Our Achievement Story
                    </h2>
                    <p className="text-gray-500 text-base font-normal leading-relaxed lg:text-start text-center">
                      Our achievement story is a testament to teamwork and
                      perseverance. Together, we've overcome challenges,
                      celebrated victories, and created a narrative of progress
                      and success.
                    </p>
                  </div>
                </div>
                <div className="w-full flex-col justify-center items-start gap-6 flex">
                  <div className="w-full justify-start items-center gap-8 grid md:grid-cols-2 grid-cols-1">
                    <div className="w-full h-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                      <CountUpText
                        value="33+ Years"
                        className="text-gray-900 text-2xl font-bold font-manrope leading-9"
                      />
                      <p className="text-gray-500 text-base font-normal leading-relaxed">
                        Influencing Digital Landscapes Together
                      </p>
                    </div>
                    <div className="w-full h-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                      <CountUpText
                        value="125+ Projects"
                        className="text-gray-900 text-2xl font-bold font-manrope leading-9"
                      />
                      <p className="text-gray-500 text-base font-normal leading-relaxed">
                        Excellence Achieved Through Success
                      </p>
                    </div>
                  </div>
                  <div className="w-full h-full justify-start items-center gap-8 grid md:grid-cols-2 grid-cols-1">
                    <div className="w-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                      <CountUpText
                        value="26+ Awards"
                        className="text-gray-900 text-2xl font-bold font-manrope leading-9"
                      />
                      <p className="text-gray-500 text-base font-normal leading-relaxed">
                        Our Dedication to Innovation Wins Understanding
                      </p>
                    </div>
                    <div className="w-full h-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                      <CountUpText
                        value="99% Happy Clients"
                        className="text-gray-900 text-2xl font-bold font-manrope leading-9"
                      />
                      <p className="text-gray-500 text-base font-normal leading-relaxed">
                        Mirrors our Focus on Client Satisfaction.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <button className="sm:w-fit w-full group px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] transition-all duration-700 ease-in-out justify-center items-center flex">
                <span className="px-1.5 text-indigo-600 text-sm font-medium leading-6 group-hover:-translate-x-0.5 transition-all duration-700 ease-in-out">
                  Read More
                </span>
                <svg
                  className="group-hover:translate-x-0.5 transition-all duration-700 ease-in-out"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    d="M6.75265 4.49658L11.2528 8.99677L6.75 13.4996"
                    stroke="#4F46E5"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div className="w-full lg:justify-start justify-center items-start flex">
              <div className="sm:w-[564px] w-full sm:h-[646px] h-full sm:bg-gray-100 rounded-3xl sm:border border-gray-200 relative">
                <img
                  className="sm:mt-5 sm:ml-5 w-full h-full rounded-3xl object-cover"
                  src="https://pagedone.io/asset/uploads/1717742431.png"
                  alt="about Us image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* footer */}
      <footer id="contact" className="border-t">
        <div className="flex flex-col gap-8 px-10 py-8 md:flex-row md:py-12 ">
          <div className="flex-1 space-y-4">
            <img src={logo} className="w-32" alt="" />
            <p className="text-sm text-muted-foreground">
              Empowering Education Through Seamless Connection by Acadizo
            </p>
          </div>
          <div className="grid flex-1 grid-cols-2 gap-12 sm:grid-cols-3">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Solutions</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    to="/ai-analytics"
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    AI Analytics
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cloud-services"
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    Cloud Services
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Company</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    to="/about"
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/careers"
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Connect</h3>
              <div className="flex space-x-4">
                <Link
                  to="https://github.com/amanesoft"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
                <Link
                  to="https://twitter.com/amanesoft"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  <BsTwitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link
                  to="https://linkedin.com/company/amanesoft"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  <LiaLinkedinIn className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t py-6">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Acadizo, Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
