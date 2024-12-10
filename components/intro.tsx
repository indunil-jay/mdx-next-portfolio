import Image from "next/image";
import authorImage from "@/public/images/author/author.jpg";

export default function Intro() {
  return (
    <section className="flex flex-col-reverse items-start gap-x-10 gap-y-4 pb-24 md:flex-row md:items-center">
      <div className="mt-2 flex-1 md:mt-0">
        <h1 className="font-serif text-3xl font-bold  decoration-border/75 decoration-2 underline-offset-8 no-underline">
          Hey, I&#39;m Jay.
        </h1>
        <p className="mt-3 font-light text-sm text-muted-foreground">
          I am a Software Engineering undergraduate from Kandy, Sri Lanka,
          specializing in modern full-stack web development. I work extensively
          with TypeScript, leveraging frameworks and tools like React, Next.js,
          Node.js, Express.js, and NestJS to build efficient and scalable
          applications.
          <br />I have experience in designing and managing backend
          architectures, writing robust APIs, and ensuring code quality with
          tools like Jest. I’m passionate about continuous learning and tackling
          innovative projects.
        </p>
      </div>
      <div className="relative">
        <Image
          className="flex-1 rounded-lg grayscale"
          src={authorImage}
          alt="jay"
          width={175}
          height={175}
          priority
        />
      </div>
    </section>
  );
}
