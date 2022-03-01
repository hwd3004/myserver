import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";

const Pagination = (props: any) => {
  // console.log("props : ", props);
  const { totalPage } = props;

  const router = useRouter();
  const [pathname, setPathname] = useState("");

  useEffect(() => {
    setPathname(router.pathname);
  }, [router.pathname]);

  const arr = [];
  for (let index = 1; index <= totalPage; index++) {
    // console.log(index);
    arr.push(
      <Fragment key={index}>
        <Link href={`${pathname}?page=${index}`}>
          <button>{index}</button>
        </Link>
        &nbsp;
      </Fragment>
    );
  }

  return <div>{arr}</div>;
};

export default Pagination;
