import * as React from 'react'
import { createGlobalStyle } from 'styled-components'
import { Banner } from '../components/Banner'
import { Content } from '../components/Content'
import { Navbar } from '../components/Navbar'
import NoiseImg from '../images/noise.png'

const GlobalStyle = createGlobalStyle`
  @import url("https://fonts.googleapis.com/css?family=Lato:500,700&display=swap");
  @import url("https://fonts.googleapis.com/css?family=Oswald:500,700&display=swap");
  body{
    -webkit-font-smoothing: antialiased;
    margin: 0;
    font-family: 'Lato', sans-serif;
    font-size: 16px;
    box-sizing: border-box;
    background-color: #000;
    background-image: url(${NoiseImg});
    color: #fff;
    p {
      line-height: 1.7;
    }
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
