import { Slider } from "./components/Slider/Slider";

function App() {
  const handleAccept = () => {
    console.log("Slider accepted!");
  };

  const handleDecline = () => {
    console.log("Slider declined!");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 p-6">
      <h1 className="mb-8 text-3xl font-bold text-white">Slider Demo</h1>
      <div className="flex w-full items-center justify-center">
        <Slider onAccept={handleAccept} onDecline={handleDecline} />
      </div>
    </div>
  );
}

export default App;
