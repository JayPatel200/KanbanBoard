export default function Header({ text, count }) {
  return (
    <div
      className= "bg-slate-600 flex items-center h-12 pl-4 rounded-md uppercase text-white"
    >
      {text}
      <div className="ml-2 bg-white w-5 h-5 text-black rounded-full flex items-center justify-center">
        {count}
      </div>
    </div>
  );
}
