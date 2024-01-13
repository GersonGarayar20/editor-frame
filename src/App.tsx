import { useState, useRef } from "react";

export default function App() {
  const containerRef = useRef<HTMLElement>(null);
  const [w, setW] = useState(200);
  const [move, setMove] = useState(200);

  const handleMouseDown = (event: any, direction: string) => {
    const startX = event.clientX;

    const handleMouseMove = (event: any) => {
      if (containerRef.current !== null) {
        if (direction === "right") {
          const deltaX = event.clientX - startX;
          setMove(deltaX * 2);
          setW(
            w + move < 320
              ? 320
              : w + move > containerRef.current.offsetWidth
              ? containerRef.current.offsetWidth
              : w + move
          );
        } else {
          const deltaX = event.clientX - startX;
          setMove(-deltaX * 2);
          setW(
            w + move < 320
              ? 320
              : w + move > containerRef.current.offsetWidth
              ? containerRef.current.offsetWidth
              : w + move
          );
        }
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <main className=" h-screen">
      <section ref={containerRef} className="border h-full">
        <article
          className="h-full m-auto relative select-none"
          style={{ maxWidth: w + move, minWidth: 320 }}
        >
          <div
            className="absolute left-0 top-1/2 w-4 h-20 -translate-y-10 bg-green-300 hover:bg-green-400 active:bg-green-500 cursor-e-resize"
            onMouseDown={(e) => handleMouseDown(e, "left")}
          ></div>
          <div
            className="absolute right-0 top-1/2 w-4 h-20 -translate-y-10 bg-red-300 hover:bg-red-400 active:bg-red-500 cursor-e-resize"
            onMouseDown={(e) => handleMouseDown(e, "right")}
          ></div>
          <div
            className="m-4 h-full text-white rounded-lg"
            style={{
              border: "1px solid #dfe3e8",
              boxShadow: "0 1px 13px 4px #00000014",
            }}
          >
            contenido
          </div>
        </article>
      </section>
    </main>
  );
}
