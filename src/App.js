import lerp from "lerp"
import React, { Suspense, useRef, useEffect, useMemo } from "react"
import { Canvas, Dom, useFrame, useLoader } from "react-three-fiber"
import { TextureLoader, LinearFilter } from "three"
import { Block, useBlock } from "./Blocks/Block"
import state from "./Store"
import "./App.css"
import "./components/CustomMaterial.js"
import {Text, MultilineText} from "./components/Text"
import Plane from "./components/Plane"
import Diamond from "./diamonds/Diamond"

function Startup() {
  const ref = useRef()
  useFrame(() => (ref.current.material.opacity = lerp(ref.current.material.opacity, 0, 0.025)))
  return <Plane ref={ref} color="#0e0e0f" position={[0, 0, 200]} scale={[100, 100, 1]} />
}

function Paragraph({ image, index, offset, factor, header, aspect, text }) {
  const { contentMaxWidth: w, canvasWidth, margin, mobile } = useBlock()
  const size = aspect < 1 && !mobile ? 0.65 : 1
  const alignRight = (canvasWidth - w * size - margin) / 2
  const pixelWidth = w * state.zoom * size
  const left = !(index % 2)
  const color = index % 2 ? "#8f1d14" : "#2fe8c3"
  return (
    <Block factor={factor} offset={offset}>
      <group position={[left ? -alignRight : alignRight, 0, 0]}>
        <Plane map={image} args={[1, 1, 32, 32]} shift={200} size={size} aspect={aspect} scale={[w * size, (w * size) / aspect, 1]} frustumCulled={false} />
        <Dom
          style={{ width: pixelWidth / (mobile ? 1 : 2), textAlign: left ? "left" : "right" }}
          position={[left || mobile ? (-w * size) / 2 : 0, (-w * size) / 2 / aspect - 0.4, 1]}>
          {text} 
        </Dom>
        <Text left={left} right={!left} size={w * 0.04} color={color} top position={[((left ? -w : w) * size) / 2, (w * size) / aspect / 2 + 0.5, -1]}>
          {header}
        </Text>
        <Block factor={0.2}>
          <Text opacity={0.5} size={w * 0.1} color="#1A1E2A" position={[((left ? w : -w) / 2) * size, (w * size) / aspect / 1.5, -10]}>
            {"0" + (index + 1)}
          </Text>
        </Block>
      </group>
    </Block>
  )
}

function Content() {
  const images = useLoader(
    TextureLoader,
    state.paragraphs.map(({ image }) => image)
  )
  useMemo(() => images.forEach(texture => (texture.minFilter = LinearFilter)), [images])
  const { contentMaxWidth: w, canvasHeight, mobile } = useBlock()
  return (
    <>
      <Block factor={1} offset={0}>
        <Block factor={1.2}>
          <Dom position={mobile ? [-w / 3.2, 1.0, -1] : [-w / 3.2, 1.1, -1]} className="frontend">Frontend{mobile ? <br /> : " "}</Dom>
        </Block>
        <Block factor={1.2}>
          {/* #d40749 */}
          <Text left size={w * 0.08} position={[-w / 3.2, 0.6, -1]} color="#8f1d14">
            {"Developer"}
          </Text>
          
        </Block>
        <Block factor={1.0}>
          <Dom position={[-w / 3.2, -w * 0.08 + 0.25, -1]}>The year 2018.{mobile ? <br /> : " "}Beginning of this journey.</Dom>
        </Block>
      </Block>
      <Block factor={1.2} offset={5.7}>
        <Block factor={1.2}>
          <MultilineText top left size={w * 0.08} lineHeight={w / 7} position={[-w / 3.0, 0, -1]} color="#2fe8c3" text={"There's\nsomething\nto know."} />
        </Block>
        <Block factor={1.0}>
          <Dom position={[mobile ? (-w / 2.5) : (-w / 3.0), -w * 0.5 + 0.25, -1]} className="quote">A user interface is like a joke. {mobile ? <br /> : <br />}If you have to explain it,{mobile ? <br /> : <br />} it’s not that good...</Dom>
        </Block>
      </Block>
      {state.paragraphs.map((props, index) => (
        <Paragraph key={index} index={index} {...props} image={images[index]} />
      ))}
      {state.stripes.map(({ offset, color, height }, index) => (
        <Block key={index} factor={-1.5} offset={offset}>
          <Plane args={[50, height, 32, 32]} shift={-4} color={color} rotation={[0, 0, Math.PI / 8]} position={[0, 0, -10]} />
        </Block>
      ))}
      <Block factor={1.25} offset={8}>
        <Block factor={1.25}>
          <MultilineText top left size={w * 0.08} lineHeight={w / 7} position={[-w / 3.0, -0.2, -1]} color="#2fe8c3" text={"Fir\nmilenge"} />
        </Block>
        <Dom className="bottom-left" position={[mobile ? (-w / 2.5) : (-w / 3.5), -canvasHeight / 1.9, 0]}>
          <p className="copyright">
            All rights reserved - 2020 <i className="far fa-copyright"></i> devendra saroj.
          </p>
        </Dom>
      </Block>
    </>
  )
}

function App() {
  const scrollArea = useRef()
  const onScroll = e => (state.top.current = e.target.scrollTop)
  useEffect(() => void onScroll({ target: scrollArea.current }), [])

  function showAboutSection() {
    document.getElementById("about_section").style.visibility = "visible";
  }
  return (
    <>
      <Canvas concurrent pixelRatio={1} orthographic camera={{ zoom: state.zoom, position: [0, 0, 500] }}>
        <Suspense fallback={<Dom center className="loading" children="Devendra is thinking..." />}>
          <Content />
          <Diamond/>
          <Startup />
        </Suspense>
      </Canvas>
      <div className="scrollArea" ref={scrollArea} onScroll={onScroll}>
      {new Array(state.sections).fill().map((_, index) => (
          <div key={index} id={"0" + index} style={{ height: `${(state.pages / state.sections) * 100}vh` }} />
        ))}
      </div>
      <div className="frame">
        <a className="frame__title" href="/index.html">
          Devendra Saroj
        </a>
        <div className="frame__links">
          <a className="frame__link" href="#" onClick={showAboutSection}> About </a>
          <a className="frame__link" target="_blank" rel="noopener noreferrer" href="/Devendra_Saroj_Resume.pdf"> Resume </a>
          <a className="frame__link" target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/devendra-saroj-78187b111/"> LinkedIn </a>
          <a className="frame__link" target="_blank" rel="noopener noreferrer" href="https://github.com/devendraSaroj"> GitHub </a>
          {/* <a className="frmae__link" target="_blank" rel="noopener noreferrer">Resume<iframe src="https://drive.google.com/file/d/1BKVc0iN_VRCrJ4AMRaQN1B-z0wCbcfQD/view?usp=sharing"></iframe></a> */}
        </div>
        <div className="frame__nav">
          <a className="frame__link" href="mailto:connect@devendrasaroj.tech" children="connect@devendrasaroj.tech" />
        </div>
        <div className="frame__nav__right">
          <a className="frame__link" target="_blank" rel="noopener noreferrer" href="https://play.google.com/store/apps/details?id=com.wordgamer.djsde.splashactivity" children="01" />
          <a className="frame__link" target="_blank" rel="noopener noreferrer" href="https://www.circlesway.com/" children="02" />
          <a className="frame__link" target="_blank" rel="noopener noreferrer" href="https://play.google.com/store/apps/details?id=com.rathh.app" children="03" />
          <a className="frame__link" target="_blank" rel="noopener noreferrer" href="https://github.com/devendraSaroj/TalkFree" children="04" />
          <a className="frame__link" target="_blank" rel="noopener noreferrer" href="https://devendrasaroj.github.io/hennge/" children="05" />
          <a className="frame__link" target="_blank" rel="noopener noreferrer" href="https://devendrasaroj.tech" children="06" />
        </div>
      </div>
      <section className="about-container" id="about_section">
        <div className="about">
            <div className="month_wise">
                <li>
                    <p className="date">July 2016 - June 2020</p>
                    <p className="designation">Bachelor of Technology (B-tech)</p>
                    <p className="company">Computer Science and Engineering</p>
                    <p className="place">IIIT Naya Raipur, India</p>
                </li>
                <li>
                    <p className="date">July 2013 - Apr 2015</p>
                    <p className="designation">Senior secondary</p>
                    <p className="company">Physics, Chemistry, Mathematics</p>
                    <p className="place">JNV Amarkantak, India</p>
                </li>
                <li>
                    <p className="date">July 2012 - Apr 2013</p>
                    <p className="designation">Higher secondary</p>
                    <p className="company">Science</p>
                    <p className="place">Govt. Excellence School Kotma, India</p>
                </li>
                
            </div>

            <div className="detail">
                <p>My name is Devendra, I am 22 years old and I am Front-end developer.</p>
                <p>In order to introduce myself, it seems to me more sensible to skip the classical entry through which I present
                    my academic as well as professional career.
                </p>
                <p>A "Need For Speed" fanatic, my friend had no choice but to cruelly uninstall it from his system. Yes, I used to play on his system as my lappy 
                    lacked the specs then. After that I had no choice but to propell me to a new hobby, the surfing over Web technologies.
                </p>
                <p>So it was by being deprived of an entertainment that I discovered another one - that quickly turned into a 
                    passion and then a profession.
                </p>
                <p>Beyond the professional dimension that front-end development has taken in my life, it remains one of my passions,
                    that I cultivate tirelessly in my spare time.</p>
                <p className="copyright">
                    All rights reserved - 2020 <i className="far fa-copyright"></i> devendra saroj.
                    <span className="code">Code by <a className="underline" href="/index.html">Devendra Saroj</a></span>
                </p>
            </div>
        </div>
        
    </section>

    </>
  )
}

export default App