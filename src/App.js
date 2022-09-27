
import './App.css';
import { NextUIProvider,  } from '@nextui-org/react';
import {  Text, Progress,Button,Checkbox, Spacer , Card, Popover , Radio, Loading,Grid,createTheme} from '@nextui-org/react';
import { useSpring, animated as a } from "react-spring";
import devops1 from "./pictures/devops1.png"
import devops2 from "./pictures/devops2.png"
import confetti from "canvas-confetti";
function LoopObject() {
  const styles = useSpring({
    loop: { reverse: true },
    from: { y: -200 , x:40, rotateX:0,rotateY:0, rotateZ:20 },
    to: { y: -100,x:-10, rotateX:180 , rotateY:190, rotateZ:180},
  })

  return (
    <a.div
      style={{
        width: 80,
        height: 80,
        backgroundColor: '#46e891',
        borderRadius: 16,
        ...styles,
      }}
    />
  )
}

function App() {

var Elevator = function(options) {

    var body = null;

    // Scroll vars
    var animation = null;
    var duration = null; // ms
    var customDuration = false;
    var startTime = null;
    var startPosition = null;
    var endPosition = 0;
    var targetElement = null;
    var verticalPadding = null;
    var elevating = false;

    var startCallback;
    var mainAudio;
    var endAudio;
    var endCallback;

    var that = this;
    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    function extendParameters(options, defaults) {
        for (var option in defaults) {
            var t =
                options[option] === undefined && typeof option !== "function";
            if (t) {
                options[option] = defaults[option];
            }
        }
        return options;
    }

    function getVerticalOffset(element) {
        var verticalOffset = 0;
        while (element) {
            verticalOffset += element.offsetTop || 0;
            element = element.offsetParent;
        }

        if (verticalPadding) {
            verticalOffset = verticalOffset - verticalPadding;
        }

        return verticalOffset;
    }

    /**
     * Main
     */

    // Time is passed through requestAnimationFrame, what a world!
    function animateLoop(time) {
        if (!startTime) {
            startTime = time;
        }

        var timeSoFar = time - startTime;
        var easedPosition = easeInOutQuad(
            timeSoFar,
            startPosition,
            endPosition - startPosition,
            duration
        );

        window.scrollTo(0, easedPosition);

        if (timeSoFar < duration) {
            animation = requestAnimationFrame(animateLoop);
        } else {
            animationFinished();
        }
    }


    this.elevate = function() {
        if (elevating) {
            return;
        }

        elevating = true;
        startPosition = document.documentElement.scrollTop || body.scrollTop;
        updateEndPosition();

        // No custom duration set, so we travel at pixels per millisecond. (0.75px per ms)
        if (!customDuration) {
            duration = Math.abs(endPosition - startPosition) * 1.5;
        }

        requestAnimationFrame(animateLoop);

        // Start music!
        if (mainAudio) {
            mainAudio.play();
        }

        if (startCallback) {
            startCallback();
        }
    };

    function browserMeetsRequirements() {
        return (
            window.requestAnimationFrame &&
            window.Audio &&
            window.addEventListener
        );
    }

    function resetPositions() {
        startTime = null;
        startPosition = null;
        elevating = false;
    }

    function updateEndPosition() {
        if (targetElement) {
            endPosition = getVerticalOffset(targetElement);
        }
    }

    function animationFinished() {
        resetPositions();

        // Stop music!
        if (mainAudio) {
            mainAudio.pause();
            mainAudio.currentTime = 0;
        }

        if (endAudio) {
            endAudio.play();
        }

        if (endCallback) {
            endCallback();
        }
    }

    function onWindowBlur() {
        // If animating, go straight to the top. And play no more music.
        if (elevating) {
            cancelAnimationFrame(animation);
            resetPositions();

            if (mainAudio) {
                mainAudio.pause();
                mainAudio.currentTime = 0;
            }

            updateEndPosition();
            window.scrollTo(0, endPosition);
        }
    }

    function bindElevateToElement(element) {
        if (element.addEventListener) {
            element.addEventListener("click", that.elevate, false);
        } else {
            // Older browsers
            element.attachEvent("onclick", function() {
                updateEndPosition();
                document.documentElement.scrollTop = endPosition;
                document.body.scrollTop = endPosition;
                window.scroll(0, endPosition);
            });
        }
    }

    function init(_options) {
		// Take the stairs instead
		if (!browserMeetsRequirements()) {
			return;
		}

        // Bind to element click event.
        body = document.body;

        var defaults = {
            duration: undefined,
            mainAudio: false,
            endAudio: false,
            preloadAudio: true,
            loopAudio: true,
            startCallback: null,
            endCallback: null
        };

        _options = extendParameters(_options, defaults);

        if (_options.element) {
            bindElevateToElement(_options.element);
        }

        if (_options.duration) {
            customDuration = true;
            duration = _options.duration;
        }

        if (_options.targetElement) {
            targetElement = _options.targetElement;
        }

        if (_options.verticalPadding) {
            verticalPadding = _options.verticalPadding;
        }

        window.addEventListener("blur", onWindowBlur, false);

        if (_options.mainAudio) {
            mainAudio = new Audio(_options.mainAudio);
            mainAudio.setAttribute("preload", _options.preloadAudio);
            mainAudio.setAttribute("loop", _options.loopAudio);
        }

        if (_options.endAudio) {
            endAudio = new Audio(_options.endAudio);
            endAudio.setAttribute("preload", "true");
        }

        if (_options.endCallback) {
            endCallback = _options.endCallback;
        }

        if (_options.startCallback) {
            startCallback = _options.startCallback;
        }
    }

    init(options);
  };
  
  const elevatoe = new Elevator({
        mainAudio: './Music/elevator.mp3',
    endAudio: './Music/ding.mp3'
  })

  const theme = createTheme({
  type: "dark",
  theme: {
    colors: {

      primaryLight: '$green200',
      primaryLightHover: '$green300',
      primaryLightActive: '$green400',
      primaryLightContrast: '$green600',
      primary: '#0072F5',
      primaryBorder: '$green500',
      primaryBorderHover: '$green600',
      primarySolidHover: '$green700',
      primarySolidContrast: '$white',
      primaryShadow: '$green500',

      gradient: 'linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)',
      link: '#5E1DAD',

      myColor: '#ff4ecd'


    },
    space: {},
    fonts: {}
  }
})
  return (
      <NextUIProvider theme={theme}>
      <div className="App bg-black pt-20 md:px-40 ">
        <div className="w-full flex justify-center rounded-md">
        <img src="https://c.tenor.com/2cKVhhxhPLsAAAAC/the-social-network-watching-movie.gif" alt="begin memes" classname="cover"/></div>
{/* Basic introduction  */}
        <div className="w-full    items-start flex px-6 flex-col justify-start  ">
          <Text h1 css={{ textGradient: "45deg, $blue600 -20%, $pink600 50%" }} className="text-start" > Blog #1 How I made my website  </Text>
          <Text h5 color='secondary' className='text-start'> now what this blog post covers is how i made my website , what styling i used and what were the challenges i faced while making this website . this doesnt mean that i used just these things these are just the tools i think should be mentioned for you to understand if you want to make something like this from scratch . now  the hardness  level of this blog is 0 , or in your case entirely beginner friendly , alright then , take that cup of coffee ☕☕ and and lets begin</Text>
          <br />
          <Text h4 color="$yellow700">Reader Level  👶</Text>
          <Progress value={37} shadow color="warning" size="xl" status="warning" /> 
          <br/>
          <Text h2 css={{ textGradient: "45deg, $blue600 -20%, $pink600 50%" }} > Introduction   </Text>
          
          <Text h5 color='secondary' className='text-start'> Hey there astronaut 🚀  , if  this is your first blog post ,<br /> i wont bore you much . so my website huh . i made sure to make it as fun and customisable as possible to lure you in hehe ;) , but dont worry I believe in MEME BASED LEARNING. allright lets begin .  the basic structure is made with  </Text>
          <Text h3 color="$yellow400"> React ⚛  </Text>
          <Text h5 color='secondary' className='text-start'>  a javascript front end framework that has almost limitless   customizations and libraries  🤩🤩🤩. eventually i will switch to something like astro  🚀 or fresh 🍋 for my website because speed go brrrr  🏎️. thing is  React changed the  developer space and many libraries are made around it , so you can say i cheated a little </Text>
          <Text h3 color="$green600"> NODEJS + VITE ⚡  </Text>
          <Text h5 color='secondary' className='text-start'> made it easy , think of node as a Runtime environment or a place where you can check javascript code on the spot 💡 . Vite is just a tool to make Development things go faster and a basic structure ready to be deployed . btw i encourage you to GOOGLE 🔍🔍🔍 things if you want links and stuff becoz that might help you , well  help you do your job  </Text>
          <div className='flex items-center w-full justify-center my-2'>
          <img
            src="https://pbs.twimg.com/media/EWDAn-XWkAs3Y5T.jpg"
            alt="Default meme"
            className='w-80 rounded-lg  border-spacing-7 border-green-500 border-6'
    /></div>
          <Text h2 css={{ textGradient: "45deg, $red600 -20%, $yellow600 50%" }} >Styling </Text>
          <Text h5 color='warning' className='text-start'>Now i Know that styling needed to be appealing so
            i imported many libraries 📚 and used many styling objects including MUi , 
            usesounds and 
            daisyui all of these concepts deserve their own blog posts but all you need to know right now is that these help us do some amazing things that a developer cannot do alone . like say for example i want a customised button and stying . look how easy it is to create a button using something like daisyui 
          
          </Text>
          



<div className='w-full flex items-center justify-evenly flex-wrap my-20 gap-4 '>
          <div>
                <Checkbox color="primary" labelColor="primary" defaultSelected={true}>
        look
      </Checkbox>
      <Spacer />
      <Checkbox color="secondary" labelColor="secondary" defaultSelected={true}>
        @ 
      </Checkbox>
      <Spacer />
      <Checkbox color="success" labelColor="success" defaultSelected={true}>
         all this
      </Checkbox>
      <Spacer />
      <Checkbox color="warning" labelColor="warning" defaultSelected={true}>
        amazing 
      </Checkbox>
      <Spacer />
      <Checkbox color="error" labelColor="error" defaultSelected={true}>
        code , WOOOW 
          </Checkbox>
        </div>
            <div>
              <Text h3 color="error">Daisyui 🌼</Text>
            <Card
      isPressable
      isHoverable
      variant="bordered"
                css={{ mw: "400px" }}
                
    >
      <Card.Body  >
        <Text >{`import { Checkbox, Spacer } from "@nextui-org/react";\n

export default function App() {\n
  \nreturn (\n
   \n <>\n
      <Checkbox color="primary" \n
      labelColor="primary" defaultSelected={true}>\n
        Primary\n
      </Checkbox>\n
    </>\n
  );\n
}
`}</Text>
      </Card.Body>
    </Card>
         </div>
          </div>
          <span className=" flex  items-center justify-center gap-2">
          <Text h5 color="warning" className="text-start">which might look much , but Compare that to something like</Text>
              <Popover placement="right-bottom" >
      <Popover.Trigger>
        <Button auto bordered  color="warning">this , </Button>
      </Popover.Trigger>
      <Popover.Content >
        <Text css={{ p: "$10" }}> im bored  🥱 to copy paste , Imagine 10000 line of   dumb unpotimised code 🤮🤮</Text>
      </Popover.Content>
            </Popover>

          </span>
          
          <Text h5 color="warning" className="text-start">that saves time⏲️ precious to you and lets you focus on other things like optimisation and stuff that matter in the long run . now do you see the value of having something like React and not self code these things  , think frameworks like react to be android  🤖(foreshadowing) play store . this allows you to choose your styling , make default styling and other stuff. now i also did some math 🧮 and translation on things which is jargon and things not fir for you rn 😕 .but dont be sad 😥😥😥 if you want to i will make an advanced page to this . and link to the page  ---&gt; here </Text>

                    <Text h5 color="warning" className="text-start mt-6">hehehe
            But you know , in real world there are not improvements only choices , exchanges . in this case .
          </Text>





          <Radio.Group orientation="horizontal" defaultValue="primary"  >
            
            <Radio value="error" color="error" labelColor='error'>
        Red Pill :  Clean Code 👓
      </Radio>
      <Radio value="primary" color="primary" labelColor="primary">
        Blue pill : Fast Code  🐇
      </Radio>

    </Radio.Group>

                    <Text h5 color="warning" className="text-start mt-6">We are exchanging speed  for rendering the website, but that's ok , becoz tailwind is special and helps us , ill explain how on seperate tailwind blog . Right now we need to talk about Animations with these styled components how i did it. 
          </Text>
          <br />
          <br/>
          <Text h2 css={{ textGradient: "45deg, $blue500 -20%, $green600 50%" }} > Animations   </Text>
                    <Text h5 color="$green600" className="text-start ">
            Now im sure you might be wondering 🤔 why animations are important , there are many sites like Facebook and Instagram , with little to no animations , well my friend 💜 , they are using animations just under the hood !!! also arent animations fun like for example
          </Text>

            <Grid.Container gap={2}>
      <Grid>
        <Loading type="default" />
      </Grid>
      <Grid>
        <Loading type="spinner" size="lg" />
      </Grid>
      <Grid>
        <Loading type="points" />
      </Grid>
      <Grid>
        <Loading type="points-opacity" />
      </Grid>
      <Grid>
        <Loading type="gradient" />
      </Grid>
    </Grid.Container>
          <Text h5 color="$green600" className="text-start ">
            now there are many many good libraries that i suggest you look into . 
            there are  libraries like  FRAMER MOTION 💣  , CSS Transition Group 🔫 but my favourite is probably React Spring 🧠
          </Text>
          <Text h2 css={{ textGradient: "45deg, $blue500 -20%, $green600 50%" }}> Secret Magic  : React spring 🪄</Text>
                    <Text h5 color="$green600" className="text-start ">
            React spring is an animation library that is quite nice to work with. More than 90% of all animations can be performed by this library alone .well due to few reasons : 

          </Text>
                              <Text h4 color="$green600" className="text-start ">
            1. Its quite Light weight as compared to other libraries 
          </Text>
          <Text h4 color="$green600" className="text-start ">
            2. its easy to use and understand  like really easy.its based on hooks and basic knowledge for eg -&gt;
          </Text>

          <div className="flex  flex-wrap w-full items-center justify-evenly gap-2">
              <Card
      isPressable
      isHoverable
      variant="bordered"
      css={{ mw: "800px", h:"400px" }}
          >
      <Card.Body>
        <Text>
                import {`{useSpring, animated as a}`} from "react-spring";<br/>
                const animatedThing =()=&gt; {'{'} <br />  const {'{styling}'}  = &gt; useSpring({
                  "{ from : {y:0px, rotateX:0,rotateY:0, rotateZ:20, x:40} , \n to:{y:100px, rotateX:180 , rotateY:190, rotateZ:180, x:-10}, loop:{reverse:true} }"
                  
                });
                <br />
                return (
                <br />
                {"<a.div style={...style}>"}
                <br/>
                ){"};"}
        </Text>
      </Card.Body>
            </Card>

            <LoopObject /></div>
          
                    <Text h4 color="$green600" className="text-start  mt-20">
            3. It is A PHYSICS  🔬 Based animation  engine and not a basic timing based , meaning i dont have to mention at which time to do what , all that is done internally , all i have to mention is the action and time required to  do that action and the process speed up or slow down accordingly . 
          </Text>

          <Text h4 color="$green600" className="text start mt-20">Now all this talk of animation and all this numbers might feel  a little tiring and it is , trust me.</Text>
          <div className="flex justify-center w-full mt-2">
            <img src="https://sayingimages.com/wp-content/uploads/classwork-funny-math-memes.jpg" alt="meme" />
          </div>


                    <Text h4 color="$green600" className="text-start mt-20 ">
            i have spent countless hours studying what each parameter does to make sure i use this physics engine properly . and i suggest you to do the same , not in the beginning but as you grow . same for CSS , read MDN Referance docs and keep googling why these algorithms are the way they are . 
            also even tho react spring is amazing 
          </Text>

          <div className='w-full flex justify-center rounded-xl my-2'>
            <img src="https://c.tenor.com/ZZ7lLVO1zZMAAAAC/surprise-tool-mickey-mouse.gif"  clasName="rounded-lg" alt="meme"/>
          </div>


          <Text h2 css={{ textGradient: "45deg, $red700 -20%, $pink700 50%" }} className="text-start mt-20 " > Github Pages & Github Actions   </Text>
          <Text h4 color="$pink600" className="text-start  ">Now this is also very interesting , notice something about my website 🤔</Text>
          <div className='relative h-40 w-full flex flex-col items-center justify-center'>
          <Text h3 color="$pink600" className="animate-pulse font-mono">https://kiritocode1.github.io </Text>
           <Text color="$purple600" size="$9xl"   className="absolute  rotate-90 top-[0.01rem] font-serif left-[34.5rem]  hidden  md:flex">{'}'}</Text>
          </div>
          <Text h4 color="$pink600" className="text-start ">the name is same to my github username 🤔 , why is that , because i use Github pages for hosting my website , it is a free hosting service given by github and all you need to do is make a repo with link as  YOURNAME.github.io and it will directly host it . how do we use create react app is also very simple , we just download the library in react app like this  </Text>
          <Text blockquote color="error"> npm install gh-pages --save dev</Text>
          <Text h4 color="$pink600" className="text-start ">this will help us directlhy compile react components to vanilla javascript that is then mounted to the page , but dont worry everything is done automatically by this library .  </Text>
          <Text h4 color="$pink600" className="text-start flex items-center gap-2 flex-wrap " >Goto your   <Text blockquote>package.json</Text> and make these changes  </Text>
          <Text blockquote color='$pink600' className="text-start" css={{w:"100%"}}>
            {"{"} <br/>
            <br/>
            "homepage": "https://YOURNAME.github.io/",
            <br />
            <br/>
            {"'scripts' :{"}
            <br />
            <br/>
            "predeploy": "npm run build",<br />
            <br/>
            "deploy": "gh-pages -d build",<br/><br/>
            {"// other scripts🤔"}
            <br />
            {"}"}<br />
            {"// other things 😊"}<br/>
            
            {"}"}
          </Text>
          <Text h4 color="$pink600" className="text-start ">that was amazing , we're almost done :)  </Text>
                    <Text h4 color="$pink600" className="text-start ">now all we need to do is simply run the script via the terminal again   </Text>
          <Text blockquote color="error"> npm run deploy </Text>
          <Text h4 color="$pink600" className="text-start ">once you see Published , you can goto your website and </Text>
                    <div className='w-full flex justify-center rounded-xl my-2'>
            <img src="http://24.media.tumblr.com/74f41345a18502326ca4dba29a3a6a76/tumblr_mr6xj3WqNR1scmg1ho1_500.gif"  clasName="rounded-lg" alt="meme"/>
          </div>
          <Text h4 color="$pink600">good job :) ,  now onto some open source things  we also need to have our github action set up </Text>
          <Text h5 color="$pink600">goto <br/> github.com/YOURNAME/YOURNAME.github.io </Text>

                    <Text h4 color="$pink600" className="text-start flex items-center gap-2 flex-wrap " >check for   <Text blockquote>Actions</Text> and select  <Text blockquote>New Workflow</Text> , select Greetings option  </Text>

                              <div className='w-full flex flex-wrap gap-6 justify-center rounded-xl my-2 items-center '>
            <img src={devops1} clasName="rounded-lg h-20" alt="meme" />
          <Text h4 color="$pink600" className="text-start">and then in the yaml file </Text>
            <img src={devops2} clasName="rounded-lg" alt="meme" />
            
          </div>
          
                    <Text h4 color="$pink600" className="text-start flex items-center gap-2 flex-wrap " >then press    <Text blockquote color="success">start commit </Text>  </Text>
          <Text h4 color="$pink600" className="text-start mt-2">this just helps and greets ppl  that are coming to help you through PRs and Open source , we will dive deep into DEVOPS and Automation  🤖 more , also i will show you  an alternative way to  deploy your website 😊😊😊</Text>

          <Text h1 css={{ textGradient: "45deg, $yellow600 -20%, $yellow800 50%" }} className="animate-bounce" >Congratulations 🎉 </Text>
          <Text h3 color="$yellow700" >You have successfully completed reading my first ever bolg 🎉, tweet @kiritotwt1 to let me know 🤟 if you liked my blog </Text>

        

          <div className='w-full flex align-center justify-center my-20'>
            <Button onClick={() => { elevatoe.elevate(); confetti({spread:180 ,particleCount:300 }); }} shadow color="accent" size='lg'> ☝️ Celebrate + Go back Up  ☝️</Button></div>
        </div>
        




    </div>
      </NextUIProvider>
  );
}

export default App;
