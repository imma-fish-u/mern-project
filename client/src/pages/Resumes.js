import React, { useState, useEffect } from "react";

import { connect, useDispatch, useSelector } from "react-redux";
import { getResumes } from "../redux/actions/resume.actions";

import { Link } from "react-router-dom";

import PageTemplate from "../components/templates/PageTemplate";
import Loader from "../components/templates/resume/Loader";
import Card from "../components/templates/resume/Card";
import Search from "../components/utils/Search";

import { skillCategories, skillOptions } from "../components/data/skillOptions";

const Resumes = () => {
  const [categoryFilter, setCategoryFilter] = useState("");
  const [skillFilter, setSkillFilter] = useState([]);
  const resumes = useSelector((state) => state.resumeReducer.resumes);
  const dispatch = useDispatch();
  const loading = false;

  useEffect(() => {
    dispatch(getResumes());
  }, []);

  if (loading) {
    return <Loader />;
  }

  const handleFilter = (value) => {
    setSkillFilter([...skillFilter, value]);
  };

  return (
    <PageTemplate pageTitle="Allresumes">
      <div className="wrapper allboards">
        <div className="allresumes__top">
          <h1 className="allresumes__top__title">Все резюме</h1>
          <Search />
        </div>

        <div className="allresumes__category-filter">
          {skillCategories.map((category) => (
            <div onClick={() => setCategoryFilter(category)}>{category}</div>
          ))}
        </div>

        <div className="allresumes__skill-filter">
          <ul className="allresumes__container__items__labels">
            {categoryFilter !== "All"
              ? skillOptions
                  .filter((item) => item.category === categoryFilter)
                  .map(({ value }, el) => (
                    <li
                      key={el}
                      onClick={() => handleFilter(value)}
                      className="cardlabel allresumes__container__items__labels__skill"
                    >
                      {value}
                    </li>
                  ))
              : skillOptions.map(({ value }, el) => (
                  <li
                    key={el}
                    onClick={() => handleFilter(value)}
                    className="cardlabel allresumes__container__items__labels__skill"
                  >
                    {value}
                  </li>
                ))}
          </ul>
        </div>

        <div className="allresumes__container">
          {!loading && resumes.length === 0 ? (
            <p className="center">Пока что нет резюме...</p>
          ) : (
            resumes.map((resume) => (
              <Link
                to={`/profile/view/:${resume.owner}`}
                key={resume._id}
                className="allresumes__container__items"
              >
                <Card {...resume}></Card>
              </Link>
            ))
          )}
        </div>
      </div>
    </PageTemplate>
  );
};

export default connect()(Resumes);
