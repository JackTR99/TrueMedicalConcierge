import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { Services } from "@/components/sections/Services";
import { InNumbers } from "@/components/sections/InNumbers";
import { Network } from "@/components/sections/Network";
import { Process } from "@/components/sections/Process";
import { Closing } from "@/components/sections/Closing";

export default function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <Services />
      <InNumbers />
      <Network />
      <Process />
      <Closing />
    </>
  );
}
