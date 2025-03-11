import { renderHook, act } from "@testing-library/react";
import { useHome } from "./useHome";
import { useDispatch, useSelector } from "react-redux";
import { fetchSkills } from "@store/slices/skills";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("@store/slices/skills", () => ({
  fetchSkills: jest.fn(),
}));

describe("useHome - Fetching and organizing skills", () => {
  test("dispatches fetchSkills when status is idle", () => {
    const mockDispatch = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (useSelector as unknown as jest.Mock).mockReturnValue({ skills: [], status: "idle" });

    renderHook(() => useHome());

    expect(mockDispatch).toHaveBeenCalledWith(fetchSkills());
  });

  test("splits skills into lineOne and lineTwo", () => {
    (useSelector as unknown as jest.Mock).mockReturnValue({
      skills: [
        { id: "L1-1", icon: "stack" },
        { id: "L2-1", icon: "ship" }
      ],
      status: "loaded",
    });

    const { result } = renderHook(() => useHome());

    expect(result.current.lineOne).toHaveLength(1);
    expect(result.current.lineOne[0].id).toBe("L1-1");
    expect(result.current.lineTwo).toHaveLength(1);
    expect(result.current.lineTwo[0].id).toBe("L2-1");
  });
});

describe("useHome - User skill selection and toggling", () => {
  test("adds a skill when conditions allow", () => {
    (useSelector as unknown as jest.Mock).mockReturnValue({
      skills: [{ id: "L1-1", icon: "stack" }],
      status: "loaded",
    });

    const { result } = renderHook(() => useHome());

    act(() => {
      result.current.toggleUserSkills({ left: true, right: false }, { id: "L1-1", icon: "stack" });
    });

    expect(result.current.userScore).toBe(1);
    expect(result.current.isSkillSelected({ id: "L1-1", icon: "stack" })).toBe(true);
  });

  test("removes a skill when right-clicked", () => {
    (useSelector as unknown as jest.Mock).mockReturnValue({
      skills: [{ id: "L1-1", icon: "stack" }],
      status: "loaded",
    });

    const { result } = renderHook(() => useHome());

    act(() => {
      result.current.toggleUserSkills({ left: true, right: false}, { id: "L1-1", icon: "stack" });
    });

    act(() => {
      result.current.toggleUserSkills({ right: true, left: false }, { id: "L1-1", icon: "stack" });
    });

    expect(result.current.userScore).toBe(0);
    expect(result.current.isSkillSelected({ id: "L1-1", icon: "stack" })).toBe(false);
  });

  test("does not add more than MAX_USER_POINTS", () => {
    (useSelector as unknown as jest.Mock).mockReturnValue({
      skills: [
        { id: "L1-1", icon: "stack" },
        { id: "L1-2", icon: "fork", requiredSkill: "L1-1" },
        { id: "L1-3", icon: "cake", requiredSkill: "L1-2" },
        { id: "L1-4", icon: "crown", requiredSkill: "L1-3" },
        { id: "L2-1", icon: "ship" },
        { id: "L2-2", icon: "goggles", requiredSkill: "L2-1" },
        { id: "L2-3", icon: "lightning", requiredSkill: "L2-2" },
      ],
      status: "loaded",
    });
  
    const { result } = renderHook(() => useHome());
  
    for (const skill of result.current.lineOne.concat(result.current.lineTwo)) {
      act(() => {
        result.current.toggleUserSkills({ left: true, right: false }, skill);
      });
    }
  
    expect(result.current.userScore).toBe(result.current.MAX_USER_POINTS);
  });
});

describe("useHome - Skill activation logic", () => {
  test("a skill can be activated if it's selected and addable", () => {
    (useSelector as unknown as jest.Mock).mockReturnValue({
      skills: [
        { id: "L1-1", icon: "stack" },
        { id: "L1-2", icon: "fork", requiredSkill: "L1-1" },
      ],
      status: "loaded",
    });

    const { result } = renderHook(() => useHome());

    act(() => {
      result.current.toggleUserSkills({ left: true, right: false }, { id: "L1-1", icon: "stack" });
    });

    expect(result.current.canActivateConnection({ id: "L1-1", icon: "stack" })).toBe(true);
    expect(result.current.canActivateConnection({ id: "L1-2", icon: "fork", requiredSkill: "L1-1" })).toBe(false);
  });
});
