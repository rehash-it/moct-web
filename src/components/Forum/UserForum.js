import {
    faCircle,
    faDownload,
    faPaperclip
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { BiUserVoice } from "react-icons/bi";
import { withRouter } from "react-router";
import ReactTimeAgo from "react-time-ago/commonjs/ReactTimeAgo";
import { file } from "../../config/config";
import ErrorLoading from "../layouts/ErrorLoading";
import { DotLoading } from "../layouts/Loading";
import { tellDate } from "../utility/Date";
import { getForum } from "./action";
import Comments from "./Comments";
import ForumUserMenu from "./ForumUserMenu";

function UserForum({ location, history, match }) {
  const [state, setState] = useState({
    loading: true,
    error: false,
    data: "",
  });
  const { data: Forum } = state;
  useEffect(() => getForum(match.params.id, setState), [match.params.id]);
  return state.loading ? (
    <DotLoading />
  ) : state.error ? (
    <ErrorLoading />
  ) : (
    <div className="container mt-3">
      <ForumUserMenu tab={location.pathname} push={history.push} />
      <div className="row">
        <div className="col-lg-12">
          <div className="card text-center">
            <div className="card-header ">
              <h2 className="text-dark">{Forum.title}</h2>
              {Forum.need_comment ? (
                Forum.status === "live" ? (
                  <p className="float-right text-dark">
                    <FontAwesomeIcon
                      icon={faCircle}
                      className="text-success mx-2"
                    />
                    The forum is live{" "}
                    {Forum.need_comment
                      ? "you can participate by commenting"
                      : ""}
                  </p>
                ) : (
                  <p className="float-right text-dark">
                    The forum is closed <ReactTimeAgo date={Forum.closed_at} />{" "}
                    <br />
                    {tellDate(Forum.closed_at)}
                  </p>
                )
              ) : (
                ""
              )}
              <hr />
            </div>
            <div className="card-body text-dark">
              <BiUserVoice className="mx-2" />
              <p
                className="indent text-dark h5"
                style={{ textAlign: "justify" }}
              >
                {Forum.description}
              </p>
              <div className="row">
                {Forum.files
                  ? Forum.files.map((f) => (
                      <div className="col-lg-4">
                        <div className="card" style={{ height: 250 }}>
                          <a
                            href={file + f.url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {f.type === "image/jpeg" ||
                            f.type === "image/png" ? (
                              <img
                                className="img-fluid"
                                role="dialog"
                                aria-labelledby="myModalLabel"
                                aria-hidden="true"
                                tabindex="-1"
                                style={{
                                  objectFit: "cover",
                                  width: "100%",
                                  height: 250,
                                }}
                                src={file + f.url}
                                alt=""
                              />
                            ) : (
                              <div className="img-fluid text-dark">
                                <h4>
                                  <FontAwesomeIcon
                                    icon={faPaperclip}
                                    className="mx-2 text-dark"
                                  />
                                  {f.name}
                                </h4>
                                <h4 className="text-center">
                                  <FontAwesomeIcon
                                    icon={faDownload}
                                    className="mx-2"
                                  />
                                </h4>
                              </div>
                            )}
                          </a>
                        </div>
                      </div>
                    ))
                  : ""}
              </div>
            </div>
          </div>
        </div>
        {Forum.need_comment ? (
          <Comments Forum={Forum} />
        ) : (
          <div className="col-lg-6 my-auto">
            <div className="card">
              <div className="card-body">
                <h2 className="text-center text-dark">
                  Comments are turned off
                </h2>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default withRouter(UserForum);
