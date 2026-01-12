import  Footer  from "@/components/modem-animated-footer";
import {WaitlistHero} from "@/components/waitlist-hero";  
import Header from "@/components/Header";
import  BigHeader  from "@/components/bigheader";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BigHeader />
      {/* <Header /> */}
    <main>{children}</main>
      <WaitlistHero />
      <Footer />
    </>
  );
}
