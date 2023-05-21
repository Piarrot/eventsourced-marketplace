import { Banner } from "../components/banner.tsx";
import { Footer } from "../components/footer.tsx";
import { Header } from "../components/header.tsx";
import { Offers } from "../components/offers.tsx";
import { PopularCategories } from "../components/popular-categories.tsx";
import { ShopsForYou } from "../components/shops-for-you.tsx";
import { Theme } from "../contexts/theme.tsx";

export function Home() {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                backgroundColor: Theme.colors.primary[20],
            }}
        >
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
        </div>
    );
}
