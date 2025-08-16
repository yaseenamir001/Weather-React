import { FaDroplet, FaWind } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";
export default function WeatherCard({ data }) {
  const today = new Date().toDateString();
  return (
    <div className="sm:p-2 text-center text-white">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <CiLocationOn className="size-7 sm:size-8" />
          <h2 className="font-bold text-lg sm:text-2xl">
            {data.name}, {data.sys.country}
          </h2>
        </div>
        <h3 className="text-sm sm:text-lg">{today}</h3>
      </div>

      <div className="flex justify-between items-center">
        {/* <img
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
          alt="Weather icon"
          className="w-[115px] h-[115px]"
        /> */}
        <img
          src={`${import.meta.env.BASE_URL}icons/${data.weather[0].icon}.svg`}
          alt={data.weather[0].description}
          className="w-[100px] h-[115px] object-contain ml-2"
        />

        <div className="text-right">
          <div className="text-2xl sm:text-3xl font-bold">
            {Math.round(data.main.temp)}°C
          </div>
          <div className="capitalize text-lg flex">{data.weather[0].main}</div>
        </div>
      </div>

      <div className="flex justify-between mt-4">
        <div className="flex items-center gap-2 text-sm">
          <FaDroplet className="size-6" />
          <div>
            <h4>Humidity</h4>
            <h4 className="flex justify-start font-bold">
              {data.main.humidity}%
            </h4>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <FaWind className="size-6" />
          <div>
            <h4>Wind Speed</h4>
            <h4 className="flex justify-start font-bold">
              {data.wind.speed} M/s
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}
