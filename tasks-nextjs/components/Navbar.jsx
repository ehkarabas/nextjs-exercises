import Link from "next/link";

const navbarLinks = [
  { url: "/client", tag: "Client" },
  { url: "/drinks", tag: "Drinks" },
  { url: "/tasks", tag: "Tasks" },
  { url: "/prisma-example", tag: "Prisma" },
];

const Navbar = () => {
  return (
    <nav className="bg-base-300 py-4">
      <div className="navbar px-8 max-w-6xl mx-auto flex-col sm:flex-row gap-2">
        <Link href="/" className="btn btn-primary uppercase">
          Next.js
        </Link>
        <ul className="menu menu-horizontal md:ml-8">
          {navbarLinks.map((link, index) => {
            return (
              <li key={`navbar-li-${index}`}>
                <Link href={link.url} className="capitalize">
                  {link.tag}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
