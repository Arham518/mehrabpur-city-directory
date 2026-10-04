import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@/hooks/useTheme";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";

const Explore = lazy(() => import("@/pages/Explore"));
const Categories = lazy(() => import("@/pages/Categories"));
const Businesses = lazy(() => import("@/pages/Businesses"));
const Sections = (name) => lazy(() => import("@/pages/Sections").then((m) => ({ default: m[name] })));
const Doctors = Sections("Doctors");
const Schools = Sections("Schools");
const Agriculture = Sections("Agriculture");
const Government = Sections("Government");
const Railway = lazy(() => import("@/pages/Railway"));
const Villages = lazy(() => import("@/pages/Villages"));
const History = lazy(() => import("@/pages/History"));
const News = lazy(() => import("@/pages/News"));
const MapPage = lazy(() => import("@/pages/MapPage"));
const Contact = lazy(() => import("@/pages/Contact"));
const Sources = lazy(() => import("@/pages/Sources"));
const NotFound = lazy(() => import("@/pages/NotFound"));

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
            <Route path="agriculture" element={<Agriculture />} />
            <Route path="government" element={<Government />} />
            <Route path="railway" element={<Railway />} />
            <Route path="villages" element={<Villages />} />
            <Route path="history" element={<History />} />
            <Route path="news" element={<News />} />
            <Route path="map" element={<MapPage />} />
            <Route path="contact" element={<Contact />} />
            <Route path="sources" element={<Sources />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
