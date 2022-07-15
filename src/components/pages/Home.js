import { useContext } from "react";
import { LanguageContext } from "../../context/context";
import BlueNile from "../../images/Blue-Nile.jpg";
import Ertale from "../../images/erta ale the smoking mountain of afar.png";
import Meskel from "../../images/meskel celebration.png";
import Monkey from "../../images/semine mountain national park.png";
import "../../styles/home.css";
import { NewsSection } from "../home/newsSection";
import { SitesSection } from "../home/sitesSection";
import CarouseL from "../layouts/carousel";
const items = [
  {
    src: Ertale,
    altText: "Eritale",
    caption: "Active magma",
  },
  {
    src: Meskel,
    altText: "Meskel",
    caption: "Christian celebration",
  },
  {
    src: BlueNile,
    altText: "Blue nile",
    caption: "Longet river in the world",
  },
  {
    src: Monkey,
    altText: "Semen mountain",
    caption: "semen mountain park",
  },
];
function Home() {
  const { t } = useContext(LanguageContext);
  return (
    <>
      <CarouseL items={items} />
      <NewsSection />
      <SitesSection />

      <div className="container">
        <div className="row">
          {/**sites */}
          {/* some importnt links */}
          <div className="col-lg-12 ">
            <div className="buttons text-center">
              <h1 className="text-center my-2">{t("important links")} </h1>
              <a
                href="https://www.gallery.gov.eimport { product } from './../Forum/tryclass';
t"
                target="_blank"
                rel="noreferrer"
              >
                <button className="fill h6">www.gallery.gov.et</button>
              </a>
              <a
                href="https://www.gallery.gov.et"
                target="_blank"
                rel="noreferrer"
              >
                <button className="pulse h6">www.gallery.gov.et</button>
              </a>
              <a
                href="https://www.gallery.gov.et"
                target="_blank"
                rel="noreferrer"
              >
                <button className="raise h6">www.gallery.gov.et</button>
              </a>
              <a
                href="https://www.gallery.gov.et"
                target="_blank"
                rel="noreferrer"
              >
                <button className="up h6">www.gallery.gov.et</button>
              </a>
              <a
                href="https://www.gallery.gov.et"
                target="_blank"
                rel="noreferrer"
              >
                <button className="slider h6">www.gallery.gov.et</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
