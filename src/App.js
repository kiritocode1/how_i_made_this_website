
import './App.css';
import { NextUIProvider,  } from '@nextui-org/react';
import {  Text, Progress,Button, Textarea,Checkbox, Spacer , Card, Popover} from '@nextui-org/react';




function App() {
  return (
    <div className="App bg-black pt-20 md:px-40">
      <NextUIProvider>
        <div className="w-full flex justify-center ">
        <img src="https://c.tenor.com/lfDHEnYIUk4AAAAC/this-is-where-the-fun-begins-star-wars.gif" alt="begin memes" classname="rounded-md"/></div>
{/* Basic introduction  */}
        <div className="w-full    items-start flex px-6 flex-col justify-start  ">
          <Text h1 css={{ textGradient: "45deg, $blue600 -20%, $pink600 50%" }} className="text-start" > Blog #1 How I made my website  </Text>
          <Text h5 color='secondary' className='text-start'> now what this blog post covers is how i made my website , what styling i used and what were the challenges i faced while making this website . this doesnt mean that i used just these things these are just the tools i think should be mentioned for you to understand if you want to make something like this from scratch . now  the hardness  level of this blog is 0 , or in your case entirely beginner friendly </Text>
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
            i imported many libraries and used many styling objects including MUi , 
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
          
          <Text h5 color="warning" className="text-start">that saves time precious to you and lets you focus on other things like optimisation and stuff that matter in the long run . now do you see the value of having something like React and not code these things  , think frameworks like react to be android (foreshadowing) plahy store . this allows you to choose your styling , make default styling and other stuff </Text>
</div>







      </NextUIProvider>
    </div>
  );
}

export default App;
