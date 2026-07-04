'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getWeatherData } from "@/lib/action";
import { Search } from "lucide-react";

function SubmitButton() {
  return (
    <Button>
      <Search className="mr-2 h-4 w-4" />
    </Button>
  );
}

export default function Home() {

  const handleSearch = async () => {
    const { data } = await getWeatherData(city);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-sky-400 to-blue-500 p-4 flex items-center justify-center">
      <div className="w-full max-w-md space-y-4">
        <form action={handleSearch} className=" flex gap-2">
          <Input 
          name="city"
          type="text" 
          placeholder="Enter Province name..." 
          className="bg-white/90"
          required
          />
          <SubmitButton />
        </form>
      </div>
    </div>
  );
}
