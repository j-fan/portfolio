import * as React from 'react'
import { createGlobalStyle } from 'styled-components'
import Banner from '../components/Banner'
import Content from '../components/Content'
import Navbar from '../components/Navbar'
import NoiseImg from '../images/noise.png'

const GlobalStyle = createGlobalStyle`
  body{
    -webkit-font-smoothing: antialiased;
    margin: 0;
    font-family: 'Lato', sans-serif;
    font-size: 16px;
    box-sizing: border-box;
    background-color: #000;
    background-image: url(${NoiseImg});
    color: #fff;
  }
`

export default () => {
  return (
    <>
      <GlobalStyle />
      <Banner />
      <Navbar />
      <Content />
    </>
  )
}
