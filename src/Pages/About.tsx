import { useRef, useLayoutEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Environment, ContactShadows } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import NavBar from "../Components/NavBar";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

export default function Aboutt() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  return (
    <div
      className="app-main relative min-h-screen bg-linear-to-b
     from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden"
    >
      <div
        className="absolute inset-0 z-10 pointer-events-none 
      bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.15)_0px,transparent_70px),radial-gradient(circle_at_70%_40%,rgba(255,255,255,0.12)_0px,transparent_90px),radial-gradient(circle_at_40%_70%,rgba(255,255,255,0.12)_0px,transparent_80px)] backdrop-blur-[1px]"
      ></div>

      {/* 3D Canvas */}
      <div className="canvas-wrapper w-full h-screen fixed top-0 left-0 z-0">
        <Canvas shadows camera={{ position: [0, 0, 15], fov: 35 }}>
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} intensity={1.2} castShadow />
          <Environment preset="city" background={false} />

          <Suspense fallback={null}>
            <Experience />
          </Suspense>
        </Canvas>
      </div>

      {/* Scrollable Content */}
      <div
        className="scroll-container relative z-10
       max-w-6xl mx-auto px-6 md:px-16 py-32 md:space-y-40 space-y-30"
      >
        <NavBar />
        {/* Header */}
        <section className="ltr:text-left rtl:text-right space-y-6 md:space-y-7">
          <h1
            className="about-font md:text-8xl text-7xl
           font-extrabold text-transparent
            bg-clip-text bg-linear-to-r
             from-indigo-400 to-cyan-400 tracking-wide"
          >
            {t("about.whatIsMaat").split('Ma’at?')[0]}
            <span className="text-indigo-300">
              {t("about.whatIsMaat").includes('Ma’at?') ? ' Ma’at?' : t("about.whatIsMaat").split('؟')[0].includes('مـاعت') ? ' مـاعت؟' : ''}
            </span>
          </h1>
        </section>
        {/* About Ma’at Team */}
        <section className="space-y-6 md:space-y-8 ltr:text-left rtl:text-right">
          <p
            className="italic text-gray-300 
           text-lg md:text-xl max-w-2xl leading-relaxed ltr:mr-auto rtl:ml-auto"
          >
            {t("about.weAreThe")}{" "}
            <span className=" italic text-indigo-400 font-semibold">
              {t("about.maatTeam")}
            </span>
            , {t("about.teamDescription")}
          </p>
        </section>
        {/* Why We Exist */}
        <section className="space-y-6 md:space-y-8 ltr:text-left rtl:text-right">
          <h2
            className="about-font text-5xl md:text-6xl
           font-extrabold text-transparent bg-clip-text 
           bg-linear-to-r from-indigo-400 to-cyan-400 tracking-wide
           md:leading-normal leading-relaxed"
          >
            {t("about.whyExist")}
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            {t("about.existDescription1")}
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            {t("about.existDescription2")}
          </p>
        </section>
        {/* Our Solution */}
        <section className="grid md:grid-cols-2 gap-16 items-center ltr:text-left rtl:text-right">
          <div className="ltr:order-1 rtl:order-1 space-y-6">
            <h2 className="about-font md:text-6xl 
            text-5xl font-extrabold text-transparent 
            
            bg-clip-text bg-linear-to-r from-indigo-400 
            to-cyan-400 tracking-wide">
              {t("about.ourSolution")}
            </h2>

            <p className="text-gray-300 text-md md:text-xl leading-relaxed">
              {t("about.solutionDescription")}
            </p>
            <ul className="text-gray-300 space-y-2 text-md md:text-lg list-none">
              <li className="flex items-center gap-2">
                <span className="text-indigo-400">★</span>
                {t("about.benefit1")}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-indigo-400">★</span>
                {t("about.benefit2")}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-indigo-400">★</span>
                {t("about.benefit3")}
              </li>
            </ul>
          </div>
          <div></div> {/* Empty for 3D model */}
        </section>
        {/* Our Goals */}
        <section className="relative md:block hidden">
          <h2 className="about-font text-center text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-cyan-400 tracking-wide mb-12">
            {t("about.ourGoals")}
          </h2>
          <div className="grid md:grid-cols-5 gap-8 items-center">
            <div
              className={`bg-white/10 backdrop-blur-lg border border-white/20
             p-8 rounded-2xl shadow-lg hover:shadow-indigo-500 transition transform hover:-translate-y-1 w-75 ${isRtl ? 'col-start-5' : 'col-start-1'}`}
            >
              <h3 className="font-bold text-xl mb-2 text-white">
                {t("about.goal1Title")}
              </h3>
              <p className="text-gray-300 text-lg">
                {t("about.goal1Desc")}
              </p>
            </div>
            <div className="col-start-5 col-span-3"></div>{" "}
            <div
              className={`bg-white/10 backdrop-blur-lg border border-white/20
            p-8 w-75 rounded-2xl
             shadow-lg hover:shadow-indigo-500 transition 
             transform hover:-translate-y-1 ${isRtl ? 'col-start-1' : 'col-start-5'}`}
            >
              <h3 className="font-bold text-xl mb-2 text-white">
                {t("about.goal2Title")}
              </h3>
              <p className="text-gray-300 text-lg">
                {t("about.goal2Desc")}
              </p>
            </div>
            <div
              className={`bg-white/10 backdrop-blur-lg border border-white/20 p-8  
            rounded-2xl shadow-lg w-75 hover:shadow-indigo-500 
            transition transform hover:-translate-y-1 ${isRtl ? 'col-start-5' : 'col-start-1'}`}
            >
              <h3 className="font-bold text-xl mb-2 text-white">
                {t("about.goal3Title")}
              </h3>
              <p className="text-gray-300 text-lg">
                {t("about.goal3Desc")}
              </p>
            </div>
            <div className="col-start-5 col-span-1"></div>{" "}
            <div
              className={`bg-white/10 backdrop-blur-lg border border-white/20
             w-75 p-8 rounded-2xl
             shadow-lg hover:shadow-indigo-500 transition 
             transform hover:-translate-y-1 ${isRtl ? 'col-start-1' : 'col-start-5'}`}
            >
              <h3 className="font-bold text-xl mb-2 text-white">
                {t("about.goal4Title")}
              </h3>
              <p className="text-gray-300 text-lg">
                {t("about.goal4Desc")}
              </p>
            </div>
          </div>
        </section>
        {/* Our Goals Mobile */}
        <section className="md:hidden">
          <h2
            className="about-font text-center 
          text-5xl font-extrabold text-transparent
           bg-clip-text bg-linear-to-r from-indigo-400 to-cyan-400 tracking-wide"
          >
            {t("about.ourGoals")}
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {[1, 2, 3, 4].map((goalNum) => (
              <div
                key={goalNum}
                className="bg-white/10 backdrop-blur-lg border border-white/20
              p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-indigo-500
              transition transform hover:-translate-y-1 w-full"
              >
                <h3 className="font-bold text-lg md:text-xl mb-2 text-white">
                  {t(`about.goal${goalNum}Title`)}
                </h3>
                <p className="text-gray-300 text-sm sm:text-base">
                  {t(`about.goal${goalNum}Desc`)}
                </p>
              </div>
            ))}
          </div>
        </section>
        <section className="h-[30vh] md:hidden"></section>
      </div>
    </div>
  );
}


// ============================
// 3D Experience
// ============================
function Experience() {
  const modelRef = useRef<THREE.Object3D | null>(null);
  const { scene } = useGLTF("/MAAT 3D Card.glb");
  const timeline = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    if (!modelRef.current) return;

    gsap.set(modelRef.current.position, { x: 4, y: 0, z: 0 });
    gsap.set(modelRef.current.rotation, { x: 0, y: -0.5, z: 0 });

    timeline.current = gsap.timeline({
      scrollTrigger: {
        trigger: ".scroll-container",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    timeline.current
      .to(modelRef.current.position, { x: -4, duration: 1 })
      .to(modelRef.current.rotation, { y: Math.PI - 0.5, duration: 1 }, "<")
      .to(modelRef.current.position, { x: 0, y: -1, z: 2, duration: 1 })
      .to(
        modelRef.current.rotation,
        { y: Math.PI * 2, z: 0.2, duration: 1 },
        "<",
      )
      .to(modelRef.current.position, { z: 6, duration: 1 })
      .to(modelRef.current.rotation, { x: -0.2, z: 0, duration: 1 }, "<");

    return () => {
      timeline.current?.kill();
    };
  }, []);

  return (
    <group>
      <primitive ref={modelRef} object={scene} scale={50} />
      <ContactShadows
        position={[0, -2.5, 0]}
        opacity={0.5}
        scale={20}
        blur={4}
        far={6}
      />
    </group>
  );
}

useGLTF.preload("/MAAT 3D Card.glb");
