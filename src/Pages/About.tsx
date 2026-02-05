import { useRef, useLayoutEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Environment, ContactShadows } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import NavBar from "../Components/NavBar";

gsap.registerPlugin(ScrollTrigger);

export default function Aboutt() {
  return (
    <div className="app-main relative min-h-screen bg-linear-to-b from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.15)_0px,transparent_70px),radial-gradient(circle_at_70%_40%,rgba(255,255,255,0.12)_0px,transparent_90px),radial-gradient(circle_at_40%_70%,rgba(255,255,255,0.12)_0px,transparent_80px)] backdrop-blur-[1px]"></div>

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
      <div className="scroll-container relative z-10 max-w-6xl mx-auto px-6 md:px-16 py-32 space-y-40">
        <NavBar/>
        {/* Header */}
        <section className="text-left space-y-6 md:space-y-8">
          <h1 className="about-font text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-cyan-400 tracking-wide">
            What is <span className="text-indigo-300">Ma’at?</span>
          </h1>
        </section>
        {/* About Ma’at Team */}
        <section className="space-y-6 md:space-y-8">
          <p className="italic text-gray-300  text-lg md:text-xl max-w-2xl leading-relaxed">
            We are the
            <span className=" italic text-indigo-400 font-semibold">
              Ma’at team
            </span>
            , making train travel smoother and more organized. Our name comes
            from <span className="italic text-indigo-500">Maat</span>, the
            ancient Egyptian concept of balance, order, and harmony.
          </p>
        </section>
        {/* Why We Exist */}
        <section className="space-y-6 md:space-y-8">
          <h2 className="about-font text-3xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-cyan-400 tracking-wide">
            Why we Are<span className="text-indigo-300"> Exist</span>
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Train travel can be challenging: passengers often crowd near certain
            doors, creating congestion, delays, and boarding
            difficulties—especially for the elderly, women, and students.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            Our mission is to create a smoother and more human-centered
            experience for every traveler.
          </p>
        </section>
        {/* Our Solution */}
        <section className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-1 space-y-6">
            <h2 className="about-font text-3xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-cyan-400 tracking-wide">
              Our <span className="text-indigo-300">Solution</span>
            </h2>

            <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
              Ma’at is a
              <span className="text-indigo-400 font-semibold">
                smart, human-centered system installed inside trains
              </span>
              . Using sensors and real-time monitoring, our system tracks
              passenger movement and integrates with a mobile app and web
              platform.
            </p>
            <ul className="text-gray-300 space-y-2 text-lg list-none">
              <li className="before:content-['★'] before:text-indigo-400 before:mr-2">
                See which carriages and doors are less crowded
              </li>
              <li className="before:content-['★'] before:text-indigo-400 before:mr-2">
                Board efficiently and comfortably
              </li>
              <li className="before:content-['★'] before:text-indigo-400 before:mr-2">
                Enjoy a calmer, more organized journey
              </li>
            </ul>
          </div>
          <div></div> {/* Empty for 3D model */}
        </section>
        {/* Our Goals */}
        <section className="relative">
          {" "}
          <h2 className="about-font text-center text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-cyan-400 tracking-wide">
            Our <span className="text-indigo-300">Solution</span>
          </h2>
          <div className="grid md:grid-cols-5 gap-8 items-center">
            <div
              className="bg-white/10 bg-blur-lg border border-white/20
             p-8 rounded-2xl shadow-lg hover:shadow-indigo-500 transition transform hover:-translate-y-1 col-start-1 w-75"
            >
              <h3 className="font-bold text-xl mb-2 text-white">
                Reduce Congestion
              </h3>
              <p className="text-gray-300 text-lg">
                Minimize crowding at train doors for faster boarding.
              </p>
            </div>
            <div className="col-start-5 col-span-3"></div>{" "}
            <div
              className="bg-white/10 bg-blur-lg border border-white/20
            p-8 w-75 rounded-2xl
             shadow-lg hover:shadow-indigo-500 transition 
             transform hover:-translate-y-1 col-start-5"
            >
              <h3 className="font-bold text-xl mb-2 text-white">
                Easier Boarding
              </h3>
              <p className="text-gray-300 text-lg">
                Make entering trains smooth and comfortable for everyone.
              </p>
            </div>
            <div
              className="bg-white/10 bg-blur-lg border border-white/20 p-8  
            rounded-2xl shadow-lg w-75 hover:shadow-indigo-500 
            transition transform hover:-translate-y-1 col-start-1"
            >
              <h3 className="font-bold text-xl mb-2 text-white">
                Shorter Stops
              </h3>
              <p className="text-gray-300 text-lg">
                Reduce train dwell times at stations efficiently.
              </p>
            </div>
            <div className="col-start-5 col-span-1"></div>{" "}
            <div
              className="bg-white/10 bg-blur-lg border border-white/20
             w-75 p-8 rounded-2xl
             shadow-lg hover:shadow-indigo-500 transition 
             transform hover:-translate-y-1 col-start-5"
            >
              <h3 className="font-bold text-xl mb-2 text-white">
                Calmer Experience
              </h3>
              <p className="text-gray-300 text-lg">
                Provide a more peaceful and organized journey.
              </p>
            </div>
          </div>
        </section>
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
