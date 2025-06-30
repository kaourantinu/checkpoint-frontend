import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="header flex flex-col items-center justify-center bg-black text-white h-32">
      <h1 className="text-3xl font-bold mb-4">Checkpoint : frontend</h1>
      <Link to="/" className="text-lg">Pays</Link>
    </header>
  );
}
