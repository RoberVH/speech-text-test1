"use client"
import Link from "next/link"
export default function Home() {


  // Utilitites func.


  // Handlers func **************************************



  return (
    <div className="flex justify-space ">
      <Link className="mr-64" href="/">
        <button className="m-2 p-2 rounded-md bg-blue-700 text-white text-xs" > Home </button>
      </Link>
      <h1 className="mt-4 ml-64 font-bold text-lg">Reconocimiento desde Microfono</h1>
      <div className="mt-32 -ml-32 text-stone-400 font-lead tracking-wide">PENDIENTE</div>
    </div>
  );
}
