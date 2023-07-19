import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import styles from './customImageList.module.css';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

function srcset(image, width, height, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format&dpr=2 2x`
  };
}

export default function CustomImageList() {
  return (
    <ImageList
      sx={{
        width: 300,
        height: '80vh',
        transform: 'translateZ(0)'
      }}
      rowHeight={200}
      gap={1}
      className={styles.containerImageList}
    >
      {itemData.map((item) => {
        const cols = item.featured ? 2 : 1;
        const rows = item.featured ? 2 : 1;

        return (
          <ImageListItem key={item.img} cols={cols} rows={rows}>
            <img {...srcset(item.img, 250, 200, rows, cols)} alt={item.title} loading="lazy" />
            <ImageListItemBar
              sx={{
                background:
                  'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                  'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
              }}
              title={item.title}
              position="top"
              actionIcon={
                <IconButton sx={{ color: 'white' }} aria-label={`star ${item.title}`}>
                  <FitnessCenterIcon />
                </IconButton>
              }
              actionPosition="left"
            />
          </ImageListItem>
        );
      })}
    </ImageList>
  );
}

const itemData = [
  {
    img: `${process.env.PUBLIC_URL}/assets/images/Home/weightlifting.jpg`,
    title: 'Weightlifting',
    author: '@bkristastucchio',
    featured: true
  },
  {
    img: `${process.env.PUBLIC_URL}/assets/images/Home/pilates.jpg`,
    title: 'Pilates',
    author: '@rollelflex_graphy726'
  },
  {
    img: `${process.env.PUBLIC_URL}/assets/images/Home/yoga.jpg`,
    title: 'Yoga',
    author: '@nolanissac'
  },
  {
    img: `${process.env.PUBLIC_URL}/assets/images/Home/crossfit.jpg`,
    title: 'Crossfit',
    author: '@arwinneil',
    featured: true
  },
  {
    img: `${process.env.PUBLIC_URL}/assets/images/Home/swim.jpg`,
    title: 'Swim',
    author: '@tjdragotta'
  },
  {
    img: `${process.env.PUBLIC_URL}/assets/images/Home/functional.jpg`,
    title: 'Functional',
    author: '@katie_wasserman'
  },
  {
    img: `${process.env.PUBLIC_URL}/assets/images/Home/boxing.jpg`,
    title: 'Boxing',
    author: '@silverdalex',
    featured: true
  }
];
