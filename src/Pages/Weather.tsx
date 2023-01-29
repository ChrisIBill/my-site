import { useEffect, useState } from "react";

interface weatherData {
  lat?: string;
}
const WeatherAPI = () => {
  const [error, setError] = useState<Error>();
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState<weatherData>({});

  useEffect(() => {
    fetch(
      "https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=2abc80633438e5beae0562a46b1716da"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setData(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return <div>{data.lat}</div>;
  }
};

export default function Weather() {
  return <WeatherAPI />;
}
