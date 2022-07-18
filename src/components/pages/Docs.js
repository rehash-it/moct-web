import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { LanguageContext } from "../../context/context";
import { datasDispatch } from "../../store/Actions/dataActions";
import { getPage } from "../../utility/route";
import DataLoading from "../layouts/DataLoading";
import ErrorLoading from "../layouts/ErrorLoading";
import { TitleBar } from "../layouts/titlebar";
import { pageCalculate, Scroll } from "../utility/general";
import Paginate from "./Paginate";

function Docs({ location }) {
  const [research, setResearch] = useState({
    data: [],
    length: 0,
    loading: true,
    error: false,
  });
  const { data, length, loading, error } = research;
  let Page = getPage(location.search);
  const page = pageCalculate(9, length);
  useEffect(() => {
    Scroll("top");
    datasDispatch(setResearch, {
      page: Page,
      limit: 9,
      url: "docs",
      admin: false,
    });
  }, [Page]);
  const { t } = useContext(LanguageContext);
  return loading ? (
    <DataLoading />
  ) : error ? (
    <ErrorLoading />
  ) : (
    <>
      <TitleBar text="Research and studies" />
      {data.length ? (
        <div className="container my-3">
          <div className="row">
            {data.map((d) => (
              <div className="card col-xs-12 col-md-4 m-2 " key={d._id}>
                <div className="card-header ">{d.title}</div>
                <div className="card-body">
                  {d.description.slice(0, 380) + "..."}
                </div>
                <div className="card-footer d-flex justify-content-end">
                  <Link to={"/docs/" + d._id}>
                    <button className="btn btn-primary float-right">
                      {t("Find out more")}
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="col-lg-12 d-flex justify-content-center mt-5">
            <Paginate link="docs" page={page} />
          </div>
        </div>
      ) : (
        <div className="container mt-4">
          <div className="row">
            <div className="col-lg-12">
              <h1 className="text-center">
                <FontAwesomeIcon icon={faFile} className="mx-2" />
                No news Studies and research registered yet
              </h1>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default withRouter(Docs);
