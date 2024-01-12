import { useState, useRef } from "react";

export default function App() {
  const resizableElementRef = useRef<HTMLElement | null>(null);
  const [w, setW] = useState(200);
  const [move, setMove] = useState(200);

  const handleMouseDown = (event: any) => {
    const startX = event.clientX;

    const handleMouseMove = (event: any) => {
      if (resizableElementRef.current !== null) {
        const deltaX = event.clientX - startX;
        console.log(deltaX * 2);
        setMove(deltaX * 2);
        setW(w + move);
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
    <main className="bg-black h-screen">
      <section className="border h-full">
        <article
          className="h-96 m-auto relative select-none"
          ref={resizableElementRef}
          style={{ maxWidth: w + move }}
        >
          <div
            className="absolute left-0 top-1/2 w-4 h-20 -translate-y-10 border bg-green-300 hover:bg-green-400 active:bg-green-500 cursor-e-resize"
            onMouseDown={handleMouseDown}
          ></div>
          <div
            className="absolute right-0 top-1/2 w-4 h-20 -translate-y-10 border bg-red-300 hover:bg-red-400 active:bg-red-500 cursor-e-resize"
            onMouseDown={handleMouseDown}
          ></div>
          <div className="border m-4 h-full shadow-2xl text-white">
            contenido
          </div>
        </article>
      </section>
    </main>
  );
}
