import Header from "@/layouts/header";

interface ContainerLayout {
  children: React.ReactNode;
}

export default function ContainerLayout({ children }: ContainerLayout) {
  return (
    <>
      <Header />
      <section className="min-h-screen pt-28 px-5 md:px-10 lg:px-24 xl:px-40 2xl:px-64 pb-32 lg:pt-32">
        {children}
      </section>
    </>
  );
}
