import { Banner } from "../components/banner.tsx";
import { Footer } from "../components/footer.tsx";
import { Header } from "../components/header.tsx";
import { Offers } from "../components/offers.tsx";
import { PopularCategories } from "../components/popular-categories.tsx";
import { ShopsForYou } from "../components/shops-for-you.tsx";

export function Home() {
    return (
        <>
            <Header />
            <main
                style={{
                    flex: "1 0 auto",
                }}
            >
                <Banner />
                <Offers />
                <ShopsForYou />
                <PopularCategories />
            </main>
            <Footer />
        </>
    );
}
