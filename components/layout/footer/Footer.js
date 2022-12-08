import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-links">
        <p className="footer-links__navigation">
          <Link className="link-1" href="/">
            Home
          </Link>
          <Link href="/addPost">Add post</Link>
          <Link href="/sign_in">Sign in</Link>
          <Link href="/sign_up">Sign up</Link>
        </p>
        <p className="footer-links__github">
          {" "}
          <Link
            className="fa fa-github"
            href="https://github.com/Yordaniss/playground"
          >
            GitHub
          </Link>
        </p>
        <p className="project-name">Playground &copy; 2022</p>
      </div>
      <img
        className="footer-illustration"
        alt="cute monkey"
        src="/images/monkey.png"
      ></img>
    </footer>
  );
}
