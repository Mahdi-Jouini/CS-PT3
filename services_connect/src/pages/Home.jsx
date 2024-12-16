import { useState, useEffect, useRef } from "react";
import { Box, IconButton, Slide, Typography } from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import Search from "../components/Search";
import "./home.css";
import img_1 from "../assets/1.png";
import img_2 from "../assets/2.png";
import img_3 from "../assets/3.png";
import img_4 from "../assets/4.png";
import img_5 from "../assets/5.png";
import img_6 from "../assets/6.png";
import img_7 from "../assets/7.png";
import img_8 from "../assets/8.png";
import img_9 from "../assets/9.png";
import img_10 from "../assets/10.png";
import img_11 from "../assets/11.png";
import img_12 from "../assets/12.png";
import img_13 from "../assets/13.png";
import img_14 from "../assets/14.png";
import img_15 from "../assets/15.png";
import SearchTrend from "../components/SearchTrend";
import AboutPage from "../components/AboutPage";

export default function Home() {
  const [height, setHeight] = useState(650);
  const boxRef = useRef(null);

  const handleExpand = () => {
    setHeight((prevHeight) => (prevHeight === 300 ? 650 : 300));
  };

  const handleWheel = (event) => {
    if (event.deltaY > 0) {
      handleExpand()
    }
  };
  const handleTouchStart = (event) => {
    const startY = event.touches[0].clientY;
    console.log(startY);
    
  };
  


  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll === 0) {
        setHeight(650);
      } else if (currentScroll > 0) {
        setHeight(300);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const images = [img_2, img_7, img_3, img_9, img_5, img_6, img_1, img_8, img_4, img_10, img_11, img_12, img_13, img_14, img_15];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
    >
      <Box
        ref={boxRef}
        sx={{
          position: "relative",
          width: "100%",
          height: height,
          display: "flex",
          flexDirection: "column",
          borderBottom: "5px solid white",
          transition: "height 0.3s ease",
          boxShadow: 5,
          overflow: "hidden",
        }}
      >
        <Box className="background">
          {images.map((image, index) => (
            <img key={index} src={image} alt={`Floating ${index + 1}`} />
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            flexGrow: 1,
            p:2
          }}
        >
          <Typography variant="h4" sx={{ mb: 2, fontFamily: "segoe print" }}>
            Tous les services pour votre quotidien.
          </Typography>
          <Typography variant="h6" sx={{ mb: 2, width: "60%" }}>
            En simples clics Service connect facilite votre quotidien pour trouver le meilleur
            service proche de vous, gagnez du temps et de l&apos;argent en déléguant à des
            prestataires qualifiés.
          </Typography>
          <Search />
        </Box>
        <IconButton sx={{ justifySelf: "end", alignSelf: 'center', width: 50, height: 50, m: 2, bgcolor: 'white' }} onClick={handleExpand}>
          {height === 300 ? <ExpandMoreRoundedIcon /> : <ExpandLessRoundedIcon />}
        </IconButton>
      </Box>
      <Slide
        direction="up"
        in={height === 300}
        mountOnEnter
        unmountOnExit
        style={{
          position: "absolute",
          top: height + 80,
          left: 0,
          width: "100%",
        }}
      >
        <Box>
          <SearchTrend />
          <AboutPage />
        </Box>
      </Slide>
      
    </Box>
  );
}
