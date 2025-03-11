import { Skill } from "@services/skills";
import { AppDispatch, RootState } from "@store/config";
import { fetchSkills } from "@store/slices/skills";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

type ChunkedSkills = [Skill[], Skill[]];

const chunkSkillsInto2Lines = (skills: Skill[]): ChunkedSkills => {
  const lineOne: Skill[] = skills.filter(skill => skill.id.startsWith("L1"));
  const lineTwo: Skill[] = skills.filter(skill => skill.id.startsWith("L2"));
  return [lineOne, lineTwo];
};

const MAX_USER_POINTS = 6;

export const useHome = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const { skills, status } = useSelector((state: RootState) => state.skills);
  const [userScore, setUserScore] = useState<number>(0);
  const [userSkills, setUserSkills] = useState<Skill[]>([]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchSkills());
    }
  }, [status, dispatch]);

  const [lineOne, lineTwo]: ChunkedSkills = chunkSkillsInto2Lines(skills);

  const isSkillSelected = (skill: Skill): boolean =>
    userSkills.some(userSkill => userSkill.id === skill.id);

  const isAddable = (skill: Skill): boolean =>
    skill.requiredSkill ? userSkills.some(userSkill => userSkill.id === skill.requiredSkill) : true;

  const isRemovable = (skill: Skill): boolean =>
    !userSkills.some(userSkill => userSkill.requiredSkill === skill.id);

  const canActivateConnection = (skill: Skill): boolean =>
    isSkillSelected(skill) && isAddable(skill);

  const toggleUserSkills = (event: {left: boolean, right: boolean}, skill: Skill): void => {
    if (event.right) {
      if (isRemovable(skill) && isSkillSelected(skill)) {
        const filteredSkills = userSkills.filter(userSkill => userSkill.id !== skill.id);
        setUserSkills(filteredSkills);
        setUserScore(filteredSkills.length);
      }
      return;
    }

    if (isAddable(skill) && !isSkillSelected(skill) && userScore < MAX_USER_POINTS) {
      const newSkills = [...userSkills, skill];
      setUserSkills(newSkills);
      setUserScore(newSkills.length);
    }
  };

  return {
    translate: t,
    toggleUserSkills,
    canActivateConnection,
    isSkillSelected,
    lineOne,
    lineTwo,
    MAX_USER_POINTS,
    userScore,
  };
};
