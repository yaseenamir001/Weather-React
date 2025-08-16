export default function ForecastList({ data }) {
  return (
    <div className="forecast-scroll flex gap-4 overflow-x-auto mt-4 pb-2 scroll-smooth">
      {data.map((item, index) => (
        <div
          key={index}
          className="min-w-[80px] bg-white/2 backdrop-blur-lg p-3 rounded-xl text-center border border-white/20 shadow-[0_4px_12px_rgba(0,0,0,0.3)] cursor-pointer"
        >
          <p className="text-white text-sm font-semibold">
            {new Date(item.dt_txt).toDateString().slice(4, 10)}
          </p>
          {/* <img
            src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
            alt=""
            className="mx-auto"
          /> */}
          <img
            src={`${import.meta.env.BASE_URL}icons/${item.weather[0].icon}.svg`}
            alt={item.weather[0].description}
            className="m-1 w-10 h-10 object-contain"
          />

          <p className="text-white">{Math.round(item.main.temp)}°C</p>
        </div>
      ))}
    </div>
  );
}
