
import './App.css';
import { NextUIProvider } from '@nextui-org/react';
import { Button ,Text, Image} from '@nextui-org/react';

const BtnComponent = () => <Button color="secondary">Click me</Button>;




function App() {
  return (
    <div className="App bg-black pt-20">
      <NextUIProvider>
{/* Basic introduction  */}
        <div className="w-full  h-[50rem]  items-start flex px-6 flex-col justify-start  ">
          <Text h1 css={{ textGradient: "45deg, $blue600 -20%, $pink600 50%" }} > Basic Structure </Text>
          
          <Text h5 color='secondary' className='text-start'> Hey there astronaut 🚀  , if  this is your first blog post ,<br /> i wont bore you much . so my website huh . i made sure to make it as fun and customisable as possible to lure you in hehe . allright lets begin .  the basic structure is made with  </Text>
          <Text h3 color="$yellow400"> React ⚛  </Text>
          <Text h5 color='secondary' className='text-start'>  a javascript front end framework that has almost limitless   customizations and libraries . eventually i will switch to something like astro or fresh  for my website because speed go brrrr. thing is  React changed the  developer space and many libraries are made around it , so you can say i cheated a little </Text>
          <Text h3 color="$green600"> NODEJS + VITE ⚡  </Text>
          <Text h5 color='secondary' className='text-start'> made it easy , think of node as a Runtime environment or a place where you can check javascript code on the spot . Vitee is just a tool to make Development things go faster and a basic structure ready to be deployed . btw i want you to google things if you want links and stuff becoz that might help you , well  help you do your job  </Text>
              <Image

            src="https://pbs.twimg.com/media/EWDAn-XWkAs3Y5T.jpg"
      alt="Default Image"
      objectFit="cover"
    />
          <Text h1 css={{ textGradient: "45deg, $red600 -20%, $yellow600 50%" }} >Styling </Text>
          <Text h5 color='warning' className='text-start'> This is where the fun begins .</Text>


          

         
      </div>








      </NextUIProvider>
    </div>
  );
}

export default App;
