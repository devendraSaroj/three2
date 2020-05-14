import { createRef } from "react"
import { Vector3 } from "three"
import image1 from './media/wordgamer.png'
import image2 from './media/circles.png'
import image3 from './media/rathh.png'
import image4 from './media/talkfree.png'
import image5 from './media/mail_archive.png'
import image6 from './media/portfolio.png'



const state = {
  sections: 9,
  pages: 8.5,
  zoom: 75,
  paragraphs: [
    {
      offset: 1,
      factor: 1.75,
      header: "Sublime App Studio",
      image: image1,
      aspect: 1.51,
      tech_stack: "Tech stack used - Java, Android, Android Canvas",
      framework: "",
      ide: "IDE - Android Studio",
      text: "Worked remotely with the Client based out of Kuala lumpur, Malaysia. The ultimate product featured the fully responsive word game, with levels ranging from easiest to toughest. Being a freemium app it has got the ads of all three types (Banner, Interstitial and Rewarded). App is packed with in app purchase with multiple combinations of coins and ads prevention.",
      link: "https://play.google.com/store/apps/details?id=com.wordgamer.djsde.splashactivity"
    },
    {
      offset: 2,
      factor: 2.0,
      header: "Circles",
      image: image2,
      aspect: 1.5,
      tech_stack: "Tech stack used - Python, Selenium Web driver",
      framework: "Framework - Scrapy",
      ide: "IDE - Pycharm by Jet brains",
      text:
        "A little after the wrapping up of app development work, I got the chance to intern with Ahemdabad based startup called 'Circles'. Being a newbie that I was, getting internship right after the first work was a win-win situation for me. This was the time when I finally got the grasp of python and some other tools like Scrapy and Selenium's webdriver.",
      link: "https://www.circlesway.com/"
      },
    {
      offset: 3,
      factor: 2.25,
      header: "Rathh: Delivery network",
      image: image3,
      aspect: 1.5037,
      tech_stack: "",
      framework: "",
      ide: "UI tools - Figma, JustInMind",
      text:
        "Until this point the focus was on development only. This is when I first learnt to work with design tools like JustInMind and my favourite one FIGMA. This app is regarding the order management of local works like drycleaning, tailoring etc. I was fortunate enough that I got the work with different exposure everytime. They surely taught me some good skills and working strategy.",
      link: "https://play.google.com/store/apps/details?id=com.rathh.app"
      },
    {
      offset: 4,
      factor: 2.0,
      header: "TalkFree",
      image: image4,
      aspect: 1.5,
      tech_stack: "Tech stack used - Dart",
      framework: "Framework - Flutter",
      ide: "IDE - VS code",
      text:
        "I was excited to develop the UI for chat app. At the time flutter was getting the popularity for offering a feature packed and cross-plateform service. The knowledge of figma from previous internship helped me to create the UI mockups. And the final development started with flutter, it surely had some hurdles but not as much as I faced while learning the android.",
      link: "https://github.com/devendraSaroj/TalkFree"
      },
    {
      offset: 5,
      factor: 1.75,
      header: "Archive Mail",
      image: image5,
      aspect: 1.55,
      tech_stack: "Tech stack used - HTML, CSS, Javascript",
      framework: "Library - ReactJS",
      ide: "IDE - VS code",
      text:
        "This project taught me the ReactJS at it's best. From writing minimal HTML to reusable components, setting up a react router to managing the state with react hooks and many more. Started with react with this project and Ended up coding this portfolio in react.",
      link: ""
      },
    { 
      offset: 7, 
      factor: 1.05, 
      header: "The Portfolio", 
      image: image6, 
      aspect: 1.77, 
      tech_stack: "Tech stack used - HTML, CSS, Javascript",
      framework: "Library - ReactJS, ThreeJS, GSAP",
      ide: "IDE - VS code",
      text: "The portfolio says a lot. But when you're a frontend developer, you must make it scream. " ,
      link: ""
    }
  ],
  stripes: [
    { offset: -0.0, color: "#000", height: 13 },
    { offset: 8.0, color: "#000", height: 20 }
  ],
  diamonds: [
    { x: 0, offset: 0.15, pos: new Vector3(), scale: 0.6, factor: 1.8 },
    { x: 2, offset: 1.1, pos: new Vector3(), scale: 0.8, factor: 2.1 },
    { x: -5, offset: 2, pos: new Vector3(), scale: 0.8, factor: 2.5 },
    { x: 0, offset: 3.2, pos: new Vector3(), scale: 0.8, factor: 1.75 },
    { x: 0, offset: 4, pos: new Vector3(), scale: 0.8, factor: 2.5 },
    { x: 2, offset: 5.5, pos: new Vector3(), scale: 1.25, factor: 0.85 },
    { x: -5, offset: 7, pos: new Vector3(), scale: 0.8, factor: 2 },
    { x: 0, offset: 8, pos: new Vector3(), scale: 1.5, factor: 6 }
  ],
  top: createRef()
}

export default state
