import React from "react";
import { Icon, IconConnector, LanguageButton } from "@components";
import { Skill } from "@services/skills";
import { useHome } from "./useHome";
import "./styles.css";

const Home: React.FC = () => {
  const { canActivateConnection, lineOne, lineTwo, toggleUserSkills, isSkillSelected, MAX_USER_POINTS, userScore, translate } = useHome()
  return (
    <div className="container">
      <LanguageButton />
      <h1 className="title">
        {translate('game_title')}
      </h1>
      <div className="calculatorContainer">
        <div className="linesContainer">
          <div className="lineContainer">
            <h5>{translate('talent_path', {number: 1})}</h5>
            <SkillLine skills={lineOne} addPoint={toggleUserSkills} canActivateConnection={canActivateConnection} isSkillSelected={isSkillSelected} />
          </div>
          <div className="lineContainer">
            <h5>{translate('talent_path', {number: 2})}</h5>
            <SkillLine skills={lineTwo} addPoint={toggleUserSkills} canActivateConnection={canActivateConnection} isSkillSelected={isSkillSelected} />
          </div>
        </div>
        <div className="spentContainer">
          <h4>{userScore}/{MAX_USER_POINTS}</h4>
          <h3 className="spentLabel">{translate('points_spent')}</h3>
        </div>
      </div>
    </div>
  );
};

const SkillLine: React.FC<{
  skills: Skill[];
  addPoint: (event: {left: boolean, right: boolean}, skill: Skill) => void;
  canActivateConnection: (skill: Skill) => boolean;
  isSkillSelected: (skill: Skill) => boolean;
}> = ({ skills, addPoint, canActivateConnection, isSkillSelected }) => {
  return (
    <div className="lineSkills">
      {skills.map((skill, index) => (
        <React.Fragment key={skill.id}>
          {index > 0 && <IconConnector status={canActivateConnection(skill) ? "active" : "inactive"} />}
          <div>
            <Icon
              name={skill.icon}
              onClick={(event: any) => addPoint(event, skill)}
              size={50}
              status={isSkillSelected(skill) ? "active" : "inactive"}
            />
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Home;
