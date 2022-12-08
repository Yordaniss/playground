export default function Pagination(props) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(props.totalPosts / props.postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const goToPage = (pageNumber) => {
    const elementOffset = document.getElementById("postsDashboard").offsetTop;
    window.scrollTo({ top: elementOffset, behavior: "smooth" });
    props.paginate(pageNumber);
  };

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((pageNumber) => (
          <li
            key={pageNumber}
            className={`page-number-item ${
              pageNumber === props.currentPage && "clicked-page-link"
            }`}
          >
            <a
              onClick={(e) => {
                goToPage(pageNumber);
              }}
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
