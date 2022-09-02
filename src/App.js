
import './App.css';
import { NextUIProvider } from '@nextui-org/react';
import { Button ,Text,Progress} from '@nextui-org/react';

const BtnComponent = () => <Button color="secondary">Click me</Button>;




function App() {
  return (
    <div className="App bg-black h-[50rem]  pt-20">
      <NextUIProvider>

        <Text h1 size={60}
        css={{
          textGradient: "45deg, $blue600 10%, $pink600 50%",
        }}
          weight="bold" shadow ># Comming soon 👨‍🚀</Text>
        <div className='flex items-center justify-center'>
        <div className='w-40'>
            <Progress value={15} shadow color="primary" status="primary" /></div></div>
      </NextUIProvider>
    </div>
  );
}

export default App;
