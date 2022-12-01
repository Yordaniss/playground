import Link from "next/link";

export default function Pagination(props) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(props.totalPosts / props.postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const goToPage = (pageNumber) => {
    props.paginate(pageNumber);
    const elementOffset = document.getElementById("postsDashboard").offsetTop;
    window.scrollTo({ top: elementOffset, behavior: "smooth" });
  };

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((pageNumber) => (
          <li key={pageNumber} className="page-number-item">
            <a
              onClick={() => goToPage(pageNumber)}
              className="page-number-link"
            >
              {pageNumber}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
