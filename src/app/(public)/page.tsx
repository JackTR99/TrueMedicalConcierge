import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Closing } from "@/components/sections/Closing";

export default function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <Services />
      <Process />
      <Closing />
    </>
  );
}
