import React from "react"
import { navigate } from "gatsby";
import SvgLolly from '../components/SvgLolly'
import "./styles.css";

export default function Home() {
  return (
    <div className='container'>
      <div className="contain_header">
        <h1>virtual lollipop</h1>
        <p>because we all know someone 
          <br /> 
          who deserves some sugar.</p>
      </div>
      <div className='contain_body'>
        <SvgLolly Top='#3eb991' Middle='#416890' Bottom='#e467ad' />
        <SvgLolly Top='#faebd7' Middle='#a98f89' Bottom='#ff623e' />
        <SvgLolly Top='#562734' Middle='#b33bda' Bottom='#3d0f96' />
        <SvgLolly Top='#d52358' Middle='#e95946' Bottom='#deaa43' />
        <SvgLolly Top='#5f5a1f' Middle='#ee82ee' Bottom='#212121' />
      </div>
      <div className='footer'>
        <input type='button' value='Make a new lolly to send to a friend' onClick={() => navigate('/create/')}/>
      </div>
    </div>
  )
}
