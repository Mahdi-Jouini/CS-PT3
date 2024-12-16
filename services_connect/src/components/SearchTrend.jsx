import {useRef} from 'react';
import { IconButton, Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSwiper } from 'swiper/react';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import 'swiper/css'; // Simplified import
import 'swiper/css/navigation'; // Add navigation styles

const data = [
  {
    id: 1,
    image: 'https://via.placeholder.com/300x200',
    title: 'Card 1',
    description: 'This is the first card description.',
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/300x200',
    title: 'Card 2',
    description: 'This is the second card description.',
  },
  {
    id: 3,
    image: 'https://via.placeholder.com/300x200',
    title: 'Card 3',
    description: 'This is the third card description.',
  },
  {
    id: 4,
    image: 'https://via.placeholder.com/300x200',
    title: 'Card 3',
    description: 'This is the third card description.',
  },
];

export default function SearchTrend() {
  const swiperRef = useRef(null);
  return (
  <Box >
    <Typography sx={{ml: 5, fontFamily: "segoe print", fontSize: 30}}> Tendance de recherche</Typography>
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
      <IconButton sx={{width: 50, height: 50}} onClick={() => swiperRef.current?.slidePrev()}  >
        <NavigateBeforeIcon />
      </IconButton>
      {/* Swiper Carousel */}
      <Swiper
        onSwiper={(swiper) => { swiperRef.current = swiper }}
        spaceBetween={20}

        breakpoints={{
          1900: {
            slidesPerView: 4, 
          },
          1200: {
            slidesPerView: 3, 
          },
          700: {
            slidesPerView: 2,
          },
          400: {
            slidesPerView: 1,
          },
        }}
      >
        {data.map((item) => (
          <SwiperSlide key={item.id}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>

            <Card sx={{ width: 300, m: 5, filter: 'drop-shadow(-20px -20px 0px #4444dd)' }} elevation={5}>
              <CardMedia
                component="img"
                height={150}
                image={item.image}
                alt={item.title}
              />
              <CardContent>
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
      <IconButton sx={{width: 50, height: 50}} onClick={() => swiperRef.current?.slideNext()} >
        <NavigateNextIcon />
      </IconButton>
    </Box>
  </Box>
  );
}