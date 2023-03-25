import { elements } from "chart.js";
import Answer from "../models/Answer";
import Offre from "../models/Offre";
import { Question } from "../models/Question";
import { ResponseQuestion } from "../models/ResponseQuestion";
import Test from "../models/Test";
import { TypeOption } from "../types";
import { ResponseCertificationTest } from "../types/response-request";
import { offres } from "./testData";

export const getOfferById = (id: number): Offre | undefined => {
  return offres.find((offre) => offre.id === id);
};

export const getOffersByTabIds = (tabIds: number[]): Offre[] => {
  let newOffres: Offre[] = [];
  tabIds.forEach((id) => {
    newOffres.push(offres.find((offre) => offre.id === id) as Offre);
  });
  return newOffres;
};

export const getIdsWithString = (offres: Offre[]): string => {
  if (offres.length < 1) return "";

  let ids = offres.map((offre) => offre.id).join("-");
  return ids;
};

export const getIdsWithTabNumber = (ids: string): number[] => {
  let tabTds = ids.split("-").map((id) => parseInt(id, 10));
  return tabTds;
};

export const allIdsExist = (tabIds: number[]) => {
  let allExist: boolean = true;
  tabIds.forEach((id) => {
    if (!getOfferById(id)) {
      allExist = false;
      return;
    }
  });
  return allExist;
};

const isALastElement = (tabs: any[], element: any) => {
  let indexOfCurrentElement = tabs.indexOf(element);
  if (indexOfCurrentElement === tabs.length - 1) {
    return true;
  }
  return false;
};

export const isLastTest = (allTests: Test[], currentActiveTest: Test) => {
  // on verifie si la question active n'est pas la derniere de la liste
  return isALastElement(allTests, currentActiveTest);
};

export const isLastQuestion = (
  allQuestions: Question[],
  currentActiveQuestion: Question
) => {
  // on verifie si la question active n'est pas la derniere de la liste
  return isALastElement(allQuestions, currentActiveQuestion);
};

export const getAllTest = (
  type: "TRAINING" | "EXAM",
  tests: Test[]
): Test[] => {
  if (type === "EXAM") return tests.filter((test) => test.type === "EXAM");
  return tests.filter((test) => test.type === "TRAINING");
};

export const getQuestionsByTestId = (
  testId: number,
  questions: Question[]
): Question[] => {
  return questions.filter((question) => question.test_id === testId);
};

export const stringExistInTheArray = (
  tabString: ResponseQuestion[],
  value: string
) => {
  let bool = false;
  tabString.filter((res) => {
    if (res.responses?.includes(value)) {
      bool = true;
    }
  });
  return bool;
};

export const getErrors = (key: string, data: any) => {
  let errors = data[`${key}`];
  return errors;
};

export const formatCurrency = (number: number, currency: string = "USD") => {
  if (currency === "USD") {
    return new Intl.NumberFormat("de-DE", { style: "currency", currency })
      .format(number)
      .replace("$", "");
  }

  return new Intl.NumberFormat("de-DE", { style: "currency", currency })
    .format(number)
    .replace("$", "");
};

export const getTestByType = (
  type: "TRAINING" | "EXAM" | "DEMO",
  tests: ResponseCertificationTest[]
) => {
  return tests.find((test) => test.type === type) ?? null;
};

export const getNameTypeText = (type: "TRAINING" | "EXAM" | "DEMO") => {
  const types = {
    TRAINING: "Test t'entrainement",
    EXAM: "Test d'examen",
    DEMO: "Test Démo",
  };
  return types[`${type}`];
};

export const getTabStringAnswers = (answers: Answer[]) => {
  return answers.map((answer) => answer.response as string);
};

export const getAnswersWithStringTabs = (
  tabs: string[],
  question: Question
) => {
  let answers: Answer[] = [];

  tabs.forEach((element, i) => {
    answers.push({
      id:
        question.responses_answer?.find((r) => r.response == element)?.id ||
        i + 1,
      question_id: question.id,
      response: element,
      responses: null,
    });
  });

  return answers;
};

export const getAnswerWithString = (element: string, question: Question) => {
  let answer: Answer = {
    id: question.response_answer?.id || 1,
    question_id: question.id,
    response: element,
    responses: null,
  };

  return answer;
};

export const getIndex = (tabs: any[], element: any) => {
  return tabs.indexOf(element) === -1 ? null : tabs.indexOf(element);
};

export const errorsTabs = [
  "lastname",
  "firstname",
  "email",
  "phone",
  "address",
  "city",
  "country",
  "code_postal",
  "business_sector",
  "picture",
  "password",
  "birthday",
];

export const getTabParamString = (tabs: { id: number; value: string }[]) => {
  let newTabs = tabs.map((element) => element.value);
  return newTabs.filter((element) => element !== "");
};

export const getTabParamStringWithId = (tabs: string[]) => {
  return tabs.map((element, i) => {
    return {
      id: i + 1,
      value: element,
    };
  });
};

export const firstLetterToUppercase = (str: string) =>
  str ? str[0].toUpperCase() + str.slice(1) : "";



export const convertToTime = (p_seconds: number) => {
  if (p_seconds >= 3600) {
    let hours = Math.floor(p_seconds / 3600); // le nombre d'heurs
    let secondesRestante = p_seconds % 3600; // le reste de secondes

    let { minutes, seconds } = convertToMinutes(secondesRestante);

    return {
      hours,
      minutes,
      seconds,
    };
  } else {
    let { minutes, seconds } = convertToMinutes(p_seconds);

    return {
      hours: 0,
      minutes,
      seconds,
    };
  }
};

export const convertToMinutes = (seconds: number) => {
  let minutes = Math.floor(seconds / 60); // le nombre de minutes
  let secondesRestante = seconds % 60; // le reste de secondes

  return {
    minutes,
    seconds: secondesRestante,
  };
};

export const convertToSeconds = (time: string): number =>  {
  const [hours, minutes] = time.split(":");
  const totalSeconds = parseInt(hours) * 3600 + parseInt(minutes) * 60;
  return totalSeconds;
}

export const secondsToTimeFormat = (totalSeconds: number): string => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  const hourString = hours.toString().padStart(2, '0');
  const minuteString = minutes.toString().padStart(2, '0');

  return `${hourString}:${minuteString}`;
}

export const addOrRemoveElement = (arr: any[], element: any): any[] => {
  const index = arr.indexOf(element);

  if (index === -1) {
    // Element not found, add it to the array
    arr.push(element);
  } else {
    // Element found, remove it from the array
    arr.splice(index, 1);
  }

  return arr;
}

export const uniqueElements = (arr1: any[], arr2: any[]) => {
  // Parcourir chaque élément du premier tableau
  for (let i = 0; i < arr1.length; i++) {
    // Vérifier si l'élément existe déjà dans le deuxième tableau
    if (arr2.includes(arr1[i])) {
      // L'élément est déjà présent, on le retire du premier tableau
      arr1.splice(i, 1);
      i--; // Décrémenter i pour éviter de sauter l'élément suivant
    } else {
      // Si l'élément est unique, on l'ajoute dans le deuxième tableau
      arr2.push(arr1[i]);
    }
  }
  // Retourner le deuxième tableau avec les éléments uniques
  return arr2;
}

export const uniqueElements2 = (arr1: any[], arr2: any[]) => {
  // Parcourir chaque élément du premier tableau
  for (let i = 0; i < arr1.length; i++) {
    // Vérifier si l'élément existe déjà dans le deuxième tableau
    if (arr2.includes(arr1[i])) {
      // L'élément est déjà présent, on le retire du premier tableau
      arr1.splice(i, 1);
      i--; // Décrémenter i pour éviter de sauter l'élément suivant
    } else {
      // Si l'élément est unique, on l'ajoute dans le deuxième tableau
      arr2.push(arr1[i]);
    }
  }
  // Retourner le deuxième tableau avec les éléments uniques
  return arr2;
}


export const addNewTestOption =(testOptions: TypeOption[],tabTestIds: number[]) => {
  // on ajoute l'element dans tab1 s'il ne s'y trouve pas
  const tab1 = uniqueElements(testOptions.map(option => option.test_id),tabTestIds);
  let newTabs = tab1;

  // pour chaque element de tab1 
  tab1.forEach((element) => {
    // verifier que l'element ne se trouve pas dans tabs 'testOptions'
    if(!testOptions.map(option => option.test_id).includes(element)){ // si oui 
      // le delete l'element de tab1
      newTabs = newTabs.filter(el => el !== element)
    }
  })

  return newTabs;
}


