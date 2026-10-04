import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@/hooks/useTheme";
import { Layout } from "@/components/Layout";
import Home from "@/pages/Home";
import Explore from "@/pages/Explore";
import Categories from "@/pages/Categories";
import Businesses from "@/pages/Businesses";
import Doctors from "@/pages/Doctors";
import Schools from "@/pages/Schools";
import Railway from "@/pages/Railway";
import Government from "@/pages/Government";
import Agriculture from "@/pages/Agriculture";
import Villages from "@/pages/Villages";
import History from "@/pages/History";
import News from "@/pages/News";
import MapPage from "@/pages/MapPage";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="explore" element={<Explore />} />
            <Route path="categories" element={<Categories />} />
            <Route path="businesses" element={<Businesses />} />
            <Route path="doctors" element={<Doctors />} />
            <Route path="schools" element={<Schools />} />
            <Route path="railway" element={<Railway />} />
            <Route path="government" element={<Government />} />
            <Route path="agriculture" element={<Agriculture />} />
            <Route path="villages" element={<Villages />} />
            <Route path="history" element={<History />} />
            <Route path="news" element={<News />} />
            <Route path="map" element={<MapPage />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
