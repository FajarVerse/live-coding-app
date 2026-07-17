import Header from "@/layouts/header";

interface ContainerLayout {
  children: React.ReactNode;
}

export default function ContainerLayout({ children }: ContainerLayout) {
  return (
    <>
      <Header />
      <section className="min-h-screen pt-28 px-5 md:px-10 mx-auto lg:px-24 xl:px-36 2xl:px-40">
        {children}
      </section>
    </>
  );
}
