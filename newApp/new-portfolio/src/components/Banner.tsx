import React from 'react'
import styled from 'styled-components'
import { NAV_BAR_HEIGHT } from './Navbar'
import BannerBgImg from '../images/banner-temp.jpg'

const BANNER_ANIM_DURATION = '0.1s'

const BannerWrapper = styled.div`
  user-select: none;
  width: 100%;
  height: calc(100vh - ${NAV_BAR_HEIGHT});
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const BannerBg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: #000;
  width: 100%;
  height: 100vh;
  z-index: -1;
  background-size: cover;
  background-repeat: no-repeat;
  opacity: 1;
  transition: opacity 1s ease 1s;
  background-image url(${BannerBgImg});
`

const BannerTitle = styled.div`
  transition-delay: 0s;
  font-family: 'Oswald', sans-serif;
  font-size: 80px;
  text-transform: uppercase;
  font-weight: 700;
`

const BannerSubtitle = styled.div`
  transition-delay: ${BANNER_ANIM_DURATION};
  font-size: 24px;
`

const Banner = () => {
  return (
    <BannerWrapper>
      <BannerBg />
      <BannerTitle>Jane Fan</BannerTitle>
      <BannerSubtitle>Media Artist & Software Engineer</BannerSubtitle>
    </BannerWrapper>
  )
}

export { Banner }
