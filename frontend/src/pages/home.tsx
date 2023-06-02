import { Footer } from "../components/footer/footer.tsx";
import { Header } from "../components/header/header.tsx";
import { Offers } from "../components/offers.tsx";
// import { PopularCategories } from "../components/popular-categories.tsx";
// import { ShopsForYou } from "../components/shops-for-you.tsx";
import { PageContainer } from "../utils/page-container.tsx";

export function Home() {
    return (
        <PageContainer>
            <Header />
            <main className="mb-20 flex-1 lg:mb-0">
                {/* <Banner /> */}
                <Offers />
                {/* <ShopsForYou /> */}
                {/* <PopularCategories /> */}
            </main>
            <Footer />
        </PageContainer>
    );
}
