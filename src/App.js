
import './App.css';
import { NextUIProvider,  } from '@nextui-org/react';
import {  Text, Progress,Button,Checkbox, Spacer , Card, Popover , Radio, Loading,Grid,createTheme} from '@nextui-org/react';



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
          <Text h4 color="$green600">Reader Level  👶</Text>
          <Progress value={15} shadow color="success" size="xl" status="primary" /> 
          <br/>
          <Text h2 css={{ textGradient: "45deg, $blue600 -20%, $pink600 50%" }} > Introduction   </Text>
          
          <Text h5 color='secondary' className='text-start'> Hey there astronaut 🚀  , if  this is your first blog post ,<br /> i wont bore you much . so my website huh . i made sure to make it as fun and customisable as possible to lure you in hehe . allright lets begin .  the basic structure is made with  </Text>
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
          <Text h2 css={{ textGradient: "45deg, $yellow500 -20%, $green600 50%" }} > Animations   </Text>
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
            there are  libraries like  FRAMER MOTION 💣  , CSS Transition Group 🔫 but my favourite is probably React Spring 

          </Text>


          <Button onClick={()=>elevatoe.elevate()}>Lol</Button>

</div>





    </div>
      </NextUIProvider>
  );
}

export default App;
