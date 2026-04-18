import type { CSSProperties } from "react";

export default function NavbarClock() {
  const now = new Date();
  const secondDeg = now.getSeconds() * 6;
  const minuteDeg = (now.getMinutes() + now.getSeconds() / 60) * 6;
  const hourDeg = ((now.getHours() % 12) + now.getMinutes() / 60) * 30;

  const markers = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="nav-hang-clock" aria-hidden="true">
      <div className="nav-hang-clock__hook" />
      <div className="nav-hang-clock__scale">
        <div className="nav-hang-clock__page-bg">
          <div className="clock-container">
            <div className="clock-face">
              {markers.map((n) => (
                <div key={`m-${n}`} className={`marker marker-${n}`}>
                  <div className="marker-dot" />
                </div>
              ))}

              {markers.map((n) => (
                <div key={`num-${n}`} className={`number number-${n}`}>
                  <span className={`number-${n}-text`}>{n}</span>
                </div>
              ))}

              <div
                className="hand hour-hand"
                style={{ ["--start-angle" as string]: `${hourDeg}deg` } as CSSProperties}
              />
              <div
                className="hand minute-hand"
                style={{ ["--start-angle" as string]: `${minuteDeg}deg` } as CSSProperties}
              />
              <div
                className="hand second-hand"
                style={{ ["--start-angle" as string]: `${secondDeg}deg` } as CSSProperties}
              />
              <div className="center-pin" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
